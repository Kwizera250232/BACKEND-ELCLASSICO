import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from './dto.blog';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAllPublished() {
    return this.prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async create(dto: CreateBlogPostDto) {
    const slug = slugify(dto.title) + '-' + Date.now();
    return this.prisma.blogPost.create({
      data: {
        ...dto,
        slug,
        publishedAt: dto.published ? new Date() : null,
      },
    });
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.published !== undefined) {
      data.publishedAt = dto.published ? new Date() : null;
    }
    if (dto.title) data.slug = slugify(dto.title) + '-' + id;
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
