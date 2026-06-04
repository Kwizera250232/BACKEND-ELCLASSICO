import type { HomepageData } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001/api';

const FALLBACK: HomepageData = {
  apartmentRooms: [
    {
      id: '1',
      title: 'Standard Room',
      tierLabel: 'COMFORTABLE',
      imageUrl:
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      capacity: 2,
      priceUsd: 50,
      apartment: { name: 'El Classico Apartments', slug: 'el-classico-apartments' },
    },
    {
      id: '2',
      title: 'Classic Room',
      tierLabel: 'ENHANCED',
      imageUrl:
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      capacity: 2,
      priceUsd: 60,
      apartment: { name: 'El Classico Apartments', slug: 'el-classico-apartments' },
    },
    {
      id: '3',
      title: 'Prestige Room',
      tierLabel: 'PREMIUM',
      imageUrl:
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      capacity: 2,
      priceUsd: 70,
      apartment: { name: 'El Classico Apartments', slug: 'el-classico-apartments' },
    },
  ],
  bookBoats: [
    {
      id: 'b1',
      title: 'Sunset Cruise',
      slug: 'sunset-cruise',
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
      slug: 'fishing-charter',
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
      slug: 'private-yacht',
      tierLabel: 'PREMIUM',
      description: 'Exclusive yacht experience for groups and celebrations.',
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
        'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80',
      caption: 'Fishing charter',
    },
    {
      id: 'g3',
      imageUrl:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80',
      caption: 'Lake Kivu shoreline',
    },
    {
      id: 'g4',
      imageUrl:
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      caption: 'Group cruise',
    },
  ],
  gardens: [
    {
      id: 'gv1',
      title: 'Ubukwe Garden',
      slug: 'ubukwe-garden',
      tagline: 'WEDDINGS & CELEBRATIONS',
      description:
        'Elegant outdoor space for weddings, receptions, and milestone celebrations by the lake.',
      imageUrl:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      priceFromUsd: 500,
    },
    {
      id: 'gv2',
      title: 'Palm Lounge',
      slug: 'palm-lounge',
      tagline: 'PRIVATE DINING',
      description: 'Intimate garden dining with curated menus and live acoustic sets.',
      imageUrl:
        'https://images.unsplash.com/photo-1416879595882-3373ecc048ef?auto=format&fit=crop&w=800&q=80',
      priceFromUsd: 150,
    },
    {
      id: 'gv3',
      title: 'Terrace Garden',
      slug: 'terrace-garden',
      tagline: 'EVENTS & MEETINGS',
      description: 'Flexible terrace for corporate events, brunches, and sunset gatherings.',
      imageUrl:
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      priceFromUsd: 200,
    },
  ],
  events: [],
  magazine: [],
};

export async function fetchHomepage(): Promise<HomepageData> {
  try {
    const res = await fetch(`${API_BASE}/homepage`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK;
    return (await res.json()) as HomepageData;
  } catch {
    return FALLBACK;
  }
}

export async function submitBoatBooking(payload: {
  boatId: string;
  fullName: string;
  email: string;
  phone?: string;
  tripDate: string;
  guests: number;
  notes?: string;
  totalAmount: number;
}): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/boats/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        ok: false,
        message: (body as { message?: string }).message ?? 'Booking request failed',
      };
    }
    return { ok: true, message: 'Your boat booking request was received.' };
  } catch {
    return { ok: false, message: 'Unable to reach the server. Please try again later.' };
  }
}
