import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BlogService } from './blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto.blog';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private async assertAdmin(authorizationHeader?: string): Promise<void> {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const token = authorizationHeader.slice(7).trim();
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET', 'replace_me_access_secret'),
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    if (!payload || payload.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
  }

  // Public
  @Get()
  findPublished() {
    return this.blogService.findAllPublished();
  }

  // Admin
  @Get('all')
  async findAll(@Headers('authorization') auth?: string) {
    await this.assertAdmin(auth);
    return this.blogService.findAll();
  }

  @Post()
  async create(@Headers('authorization') auth?: string, @Body() dto?: CreateBlogPostDto) {
    await this.assertAdmin(auth);
    return this.blogService.create(dto!);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Headers('authorization') auth?: string,
    @Body() dto?: UpdateBlogPostDto,
  ) {
    await this.assertAdmin(auth);
    return this.blogService.update(id, dto!);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Headers('authorization') auth?: string) {
    await this.assertAdmin(auth);
    return this.blogService.remove(id);
  }
}
