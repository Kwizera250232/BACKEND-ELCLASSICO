import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateMenuItemDto } from './dto.create-menu-item';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async listCategories() {
    const categories = await this.prisma.menuCategory.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        _count: {
          select: { items: true },
        },
      },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      itemCount: category._count.items,
    }));
  }

  async listItems() {
    const items = await this.prisma.menuItem.findMany({
      orderBy: [{ category: { name: 'asc' } }, { title: 'asc' }],
      include: { category: true },
    });

    return items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category.name,
      spiceLevel: item.spiceLevel,
      pairingHint: item.pairingHint,
      isAvailable: item.isAvailable,
      basePrice: Number(item.basePrice),
    }));
  }

  createItem(dto: CreateMenuItemDto) {
    return this.prisma.menuItem.create({
      data: {
        categoryId: dto.categoryId,
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        basePrice: new Prisma.Decimal(dto.basePrice),
        isAvailable: dto.isAvailable ?? true,
        spiceLevel: dto.spiceLevel ?? 0,
        pairingHint: dto.pairingHint,
      },
    });
  }
}
