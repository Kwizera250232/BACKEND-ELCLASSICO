import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROOM_IMAGES = {
  standard:
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
  classic:
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  prestige:
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
};

const BOAT_IMAGES = {
  sunset:
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
  fishing:
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80',
  luxury:
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80',
};

const GARDEN_IMAGES = {
  ubukwe:
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
  lounge:
    'https://images.unsplash.com/photo-1416879595882-3373ecc048ef?auto=format&fit=crop&w=800&q=80',
  terrace:
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
};

async function main() {
  const apartment = await prisma.apartment.upsert({
    where: { slug: 'el-classico-apartments' },
    update: {},
    create: {
      name: 'El Classico Apartments',
      slug: 'el-classico-apartments',
      description:
        'Luxury lakeside apartments with premium comfort, classic elegance, and prestige suites.',
      coverImageUrl: ROOM_IMAGES.prestige,
    },
  });

  const rooms = [
    {
      title: 'Standard Room',
      tierLabel: 'COMFORTABLE',
      baseNightlyRate: 50,
      sortOrder: 1,
      imageUrl: ROOM_IMAGES.standard,
    },
    {
      title: 'Classic Room',
      tierLabel: 'ENHANCED',
      baseNightlyRate: 60,
      sortOrder: 2,
      imageUrl: ROOM_IMAGES.classic,
    },
    {
      title: 'Prestige Room',
      tierLabel: 'PREMIUM',
      baseNightlyRate: 70,
      sortOrder: 3,
      imageUrl: ROOM_IMAGES.prestige,
    },
  ];

  for (const room of rooms) {
    const existing = await prisma.room.findFirst({
      where: { apartmentId: apartment.id, title: room.title },
    });
    if (existing) {
      await prisma.room.update({
        where: { id: existing.id },
        data: room,
      });
    } else {
      await prisma.room.create({
        data: {
          apartmentId: apartment.id,
          capacity: 2,
          ...room,
        },
      });
    }
  }

  const boats = [
    {
      title: 'Sunset Cruise',
      slug: 'sunset-cruise',
      tierLabel: 'RELAXING',
      description: 'Golden-hour cruise on Lake Kivu with refreshments.',
      imageUrl: BOAT_IMAGES.sunset,
      priceUsd: 120,
      sortOrder: 1,
    },
    {
      title: 'Fishing Charter',
      slug: 'fishing-charter',
      tierLabel: 'ADVENTURE',
      description: 'Half-day guided fishing with gear included.',
      imageUrl: BOAT_IMAGES.fishing,
      priceUsd: 95,
      sortOrder: 2,
    },
    {
      title: 'Private Yacht',
      slug: 'private-yacht',
      tierLabel: 'PREMIUM',
      description: 'Exclusive yacht experience for groups and celebrations.',
      imageUrl: BOAT_IMAGES.luxury,
      priceUsd: 250,
      sortOrder: 3,
    },
  ];

  for (const boat of boats) {
    await prisma.boat.upsert({
      where: { slug: boat.slug },
      update: boat,
      create: boat,
    });
  }

  const galleryImages = [
    { imageUrl: BOAT_IMAGES.sunset, caption: 'Sunset departure', sortOrder: 1 },
    { imageUrl: BOAT_IMAGES.fishing, caption: 'Fishing charter', sortOrder: 2 },
    { imageUrl: BOAT_IMAGES.luxury, caption: 'Private yacht', sortOrder: 3 },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
      caption: 'Lake Kivu shoreline',
      sortOrder: 4,
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      caption: 'Group cruise',
      sortOrder: 5,
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      caption: 'Evening on the water',
      sortOrder: 6,
    },
  ];

  const galleryCount = await prisma.boatGalleryImage.count();
  if (galleryCount === 0) {
    await prisma.boatGalleryImage.createMany({ data: galleryImages });
  }

  const gardens = [
    {
      title: 'Ubukwe Garden',
      slug: 'ubukwe-garden',
      tagline: 'WEDDINGS & CELEBRATIONS',
      description:
        'Elegant outdoor space for weddings, receptions, and milestone celebrations by the lake.',
      imageUrl: GARDEN_IMAGES.ubukwe,
      priceFrom: 500,
      sortOrder: 1,
    },
    {
      title: 'Palm Lounge',
      slug: 'palm-lounge',
      tagline: 'PRIVATE DINING',
      description: 'Intimate garden dining with curated menus and live acoustic sets.',
      imageUrl: GARDEN_IMAGES.lounge,
      priceFrom: 150,
      sortOrder: 2,
    },
    {
      title: 'Terrace Garden',
      slug: 'terrace-garden',
      tagline: 'EVENTS & MEETINGS',
      description: 'Flexible terrace for corporate events, brunches, and sunset gatherings.',
      imageUrl: GARDEN_IMAGES.terrace,
      priceFrom: 200,
      sortOrder: 3,
    },
  ];

  for (const garden of gardens) {
    await prisma.gardenVenue.upsert({
      where: { slug: garden.slug },
      update: garden,
      create: garden,
    });
  }

  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    const startsAt = new Date();
    startsAt.setMonth(startsAt.getMonth() + 1);
    const endsAt = new Date(startsAt);
    endsAt.setHours(endsAt.getHours() + 5);

    await prisma.event.create({
      data: {
        title: 'Lake Kivu Jazz Night',
        description: 'Live jazz, lakeside cocktails, and VIP seating under the stars.',
        coverImageUrl:
          'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
        startsAt,
        endsAt,
        vipPackages: {
          create: [
            { title: 'Standard', price: 25, perks: 'General admission' },
            { title: 'VIP', price: 75, perks: 'Front row + welcome drink' },
          ],
        },
      },
    });
  }

  const magazineCount = await prisma.blogPost.count({
    where: { slug: { startsWith: 'magazine-' } },
  });
  if (magazineCount === 0) {
    await prisma.blogPost.createMany({
      data: [
        {
          title: 'A Weekend on Lake Kivu',
          slug: 'magazine-weekend-lake-kivu',
          excerpt: 'Discover the best way to spend 48 hours at El Classico.',
          content:
            'From sunrise boat trips to garden dinners, here is how guests make the most of a lakeside weekend.',
          coverImage:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
          published: true,
          publishedAt: new Date(),
        },
        {
          title: 'Ubukwe: Celebrating in the Garden',
          slug: 'magazine-ubukwe-garden',
          excerpt: 'Why couples choose our Ubukwe garden for unforgettable weddings.',
          content:
            'Our team shares styling tips, seasonal flowers, and the perfect timeline for your celebration.',
          coverImage: GARDEN_IMAGES.ubukwe,
          published: true,
          publishedAt: new Date(),
        },
      ],
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
