import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  Post,
  Query,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminMediaService } from './admin-media.service';

@Controller('admin/media')
export class AdminMediaController {
  constructor(
    private readonly adminMediaService: AdminMediaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private async assertAdmin(authorizationHeader?: string): Promise<void> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const token = authorizationHeader.slice('Bearer '.length).trim();

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET', 'replace_me_access_secret'),
    });

    if (!payload || payload.role !== 'ADMIN') {
      throw new ForbiddenException('Admin role required');
    }
  }

  @Get('public')
  listPublic(@Query('folder') folder = 'general') {
    return this.adminMediaService.listMedia(folder);
  }

  @Get()
  async listAdmin(
    @Headers('authorization') authorization: string | undefined,
    @Query('folder') folder = 'general',
  ) {
    await this.assertAdmin(authorization);
    return this.adminMediaService.listMedia(folder);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async upload(
    @Headers('authorization') authorization: string | undefined,
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder = 'general',
  ) {
    await this.assertAdmin(authorization);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.adminMediaService.uploadImage({
      file,
      folder,
    });
  }

  @Delete()
  async remove(
    @Headers('authorization') authorization: string | undefined,
    @Query('publicId') publicId = '',
  ) {
    await this.assertAdmin(authorization);
    return this.adminMediaService.deleteImage(publicId.trim());
  }
}
