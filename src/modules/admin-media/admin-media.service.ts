import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

type UploadImageInput = {
  file: Express.Multer.File;
  folder: string;
};

@Injectable()
export class AdminMediaService {
  constructor(private readonly config: ConfigService) {}

  private getRootFolder(): string {
    return this.config.get<string>('CLOUDINARY_FOLDER_ROOT', 'elclassico').trim() || 'elclassico';
  }

  private sanitizeFolder(folder: string): string {
    const normalized = folder.trim().toLowerCase().replace(/[^a-z0-9\-_\/]/g, '-');
    return normalized || 'general';
  }

  private getTargetFolder(folder: string): string {
    return `${this.getRootFolder()}/${this.sanitizeFolder(folder)}`;
  }

  private ensureConfigured(): void {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME', '').trim();
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY', '').trim();
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET', '').trim();

    if (!cloudName || !apiKey || !apiSecret) {
      throw new BadRequestException('Cloudinary is not configured on the server');
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  async listMedia(folder: string) {
    this.ensureConfigured();
    const targetFolder = this.getTargetFolder(folder);

    const result = await cloudinary.search
      .expression(`folder="${targetFolder}"`)
      .sort_by('created_at', 'desc')
      .max_results(60)
      .execute();

    const resources = (result.resources ?? []).map((resource: any) => ({
      publicId: resource.public_id,
      secureUrl: resource.secure_url,
      width: resource.width,
      height: resource.height,
      bytes: resource.bytes,
      format: resource.format,
      createdAt: resource.created_at,
    }));

    return {
      folder,
      resources,
    };
  }

  async uploadImage(input: UploadImageInput) {
    this.ensureConfigured();

    if (!input.file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!input.file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image uploads are allowed');
    }

    const targetFolder = this.getTargetFolder(input.folder);

    try {
      const uploaded = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: targetFolder,
            resource_type: 'image',
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          },
        );

        stream.end(input.file.buffer);
      });

      return {
        publicId: uploaded.public_id,
        secureUrl: uploaded.secure_url,
        width: uploaded.width,
        height: uploaded.height,
        format: uploaded.format,
        bytes: uploaded.bytes,
        createdAt: uploaded.created_at,
      };
    } catch {
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async deleteImage(publicId: string) {
    this.ensureConfigured();

    if (!publicId || !publicId.startsWith(`${this.getRootFolder()}/`)) {
      throw new BadRequestException('Invalid media identifier');
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });

    return {
      publicId,
      result: result.result,
    };
  }
}
