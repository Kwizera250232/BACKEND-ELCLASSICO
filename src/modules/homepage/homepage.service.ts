import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

function decimalToNumber(value: { toString(): string } | null | undefined): number | null {
  if (value == null) return null;
  return Number.parseFloat(value.toString());
}

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomepage() {
    const [rooms, boats, boatGallery, gardens, events, magazine] = await Promise.all([
      this.prisma.room.findMany({
        include: { apartment: { select: { name: true, slug: true } } },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.boat.findMany({
        where: { isAvailable: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.boatGalleryImage.findMany({
        orderBy: { sortOrder: 'asc' },
        select: { id: true, imageUrl: true, caption: true },
      }),
      this.prisma.gardenVenue.findMany({
        where: { isAvailable: true },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.event.findMany({
        include: { vipPackages: true },
        orderBy: { startsAt: 'asc' },
        take: 6,
      }),
      this.prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
        take: 6,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          publishedAt: true,
        },
      }),
    ]);

    return {
      apartmentRooms: rooms.map((room) => ({
        id: room.id,
        title: room.title,
        tierLabel: room.tierLabel,
        imageUrl: room.imageUrl,
        capacity: room.capacity,
        priceUsd: decimalToNumber(room.baseNightlyRate),
        apartment: room.apartment,
      })),
      bookBoats: boats.map((boat) => ({
        id: boat.id,
        title: boat.title,
        slug: boat.slug,
        tierLabel: boat.tierLabel,
        description: boat.description,
        imageUrl: boat.imageUrl,
        priceUsd: decimalToNumber(boat.priceUsd),
        priceLabel: boat.priceLabel,
      })),
      boatBookingGallery: boatGallery,
      gardens: gardens.map((garden) => ({
        id: garden.id,
        title: garden.title,
        slug: garden.slug,
        tagline: garden.tagline,
        description: garden.description,
        imageUrl: garden.imageUrl,
        priceFromUsd: decimalToNumber(garden.priceFrom),
      })),
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        coverImageUrl: event.coverImageUrl,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        vipPackages: event.vipPackages.map((pkg) => ({
          id: pkg.id,
          title: pkg.title,
          priceUsd: decimalToNumber(pkg.price),
          perks: pkg.perks,
        })),
      })),
      magazine,
    };
  }
}
