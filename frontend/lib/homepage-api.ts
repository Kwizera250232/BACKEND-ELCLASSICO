export type ApartmentRoom = {
  id: string;
  title: string;
  tierLabel: string | null;
  imageUrl: string | null;
  priceUsd: number | null;
};

export type BookBoat = {
  id: string;
  title: string;
  tierLabel: string;
  description: string;
  imageUrl: string;
  priceUsd: number | null;
  priceLabel: string;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;
  caption: string | null;
};

export type GardenVenue = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  priceFromUsd: number | null;
};

export type HomepageEvent = {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  startsAt: string;
};

export type MagazinePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
};

export type HomepagePayload = {
  apartmentRooms: ApartmentRoom[];
  bookBoats: BookBoat[];
  boatBookingGallery: GalleryImage[];
  gardens: GardenVenue[];
  events: HomepageEvent[];
  magazine: MagazinePost[];
};

const fallback: HomepagePayload = {
  apartmentRooms: [
    {
      id: 'r1',
      title: 'Standard Room',
      tierLabel: 'COMFORTABLE',
      imageUrl:
        'https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/829171217.jpg?k=4208cc1ebd5d4b1d618f5180ce134a6ce1cfd7e876bfb18d2f873562296df090&o=',
      priceUsd: 50,
    },
    {
      id: 'r2',
      title: 'Classic Room',
      tierLabel: 'ENHANCED',
      imageUrl:
        'https://res.cloudinary.com/do1zvhe3j/image/upload/v1777837390/elclassico/bar-overview/bny19igudahdbtyqh7eh.jpg',
      priceUsd: 60,
    },
    {
      id: 'r3',
      title: 'Prestige Room',
      tierLabel: 'PREMIUM',
      imageUrl:
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      priceUsd: 70,
    },
  ],
  bookBoats: [
    {
      id: 'b1',
      title: 'Sunset Cruise',
      tierLabel: 'RELAXING',
      description: 'Golden-hour cruise on Lake Kivu with refreshments.',
      imageUrl:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      priceUsd: 120,
      priceLabel: 'per trip',
    },
    {
      id: 'b2',
      title: 'Fishing Charter',
      tierLabel: 'ADVENTURE',
      description: 'Half-day guided fishing with gear included.',
      imageUrl:
        'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80',
      priceUsd: 95,
      priceLabel: 'per trip',
    },
    {
      id: 'b3',
      title: 'Private Yacht',
      tierLabel: 'PREMIUM',
      description: 'Exclusive yacht for groups and celebrations.',
      imageUrl:
        'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80',
      priceUsd: 250,
      priceLabel: 'per trip',
    },
  ],
  boatBookingGallery: [
    {
      id: 'g1',
      imageUrl:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
      caption: 'Sunset departure',
    },
    {
      id: 'g2',
      imageUrl:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      caption: 'Lake Kivu shoreline',
    },
    {
      id: 'g3',
      imageUrl:
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      caption: 'Group cruise',
    },
  ],
  gardens: [
    {
      id: 'gv1',
      title: 'Ubukwe Garden',
      tagline: 'WEDDINGS & CELEBRATIONS',
      description: 'Elegant outdoor space for weddings and receptions by the lake.',
      imageUrl:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      priceFromUsd: 500,
    },
    {
      id: 'gv2',
      title: 'Palm Lounge',
      tagline: 'PRIVATE DINING',
      description: 'Intimate garden dining with curated menus.',
      imageUrl:
        'https://images.unsplash.com/photo-1416879595882-3373ecc048ef?auto=format&fit=crop&w=800&q=80',
      priceFromUsd: 150,
    },
    {
      id: 'gv3',
      title: 'Terrace Garden',
      tagline: 'EVENTS & MEETINGS',
      description: 'Flexible terrace for corporate events and sunset gatherings.',
      imageUrl:
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      priceFromUsd: 200,
    },
  ],
  events: [],
  magazine: [],
};

export async function getHomepagePayload(): Promise<HomepagePayload> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001/api';

  try {
    const res = await fetch(`${apiBase}/homepage`, { next: { revalidate: 60 } });
    if (!res.ok) return fallback;
    const data = (await res.json()) as HomepagePayload;
    return {
      apartmentRooms: data.apartmentRooms?.length ? data.apartmentRooms : fallback.apartmentRooms,
      bookBoats: data.bookBoats?.length ? data.bookBoats : fallback.bookBoats,
      boatBookingGallery: data.boatBookingGallery?.length
        ? data.boatBookingGallery
        : fallback.boatBookingGallery,
      gardens: data.gardens?.length ? data.gardens : fallback.gardens,
      events: data.events ?? [],
      magazine: data.magazine ?? [],
    };
  } catch {
    return fallback;
  }
}
