export type ApartmentRoom = {
  id: string;
  title: string;
  tierLabel: string | null;
  imageUrl: string | null;
  capacity: number;
  priceUsd: number | null;
  apartment: { name: string; slug: string };
};

export type BookBoat = {
  id: string;
  title: string;
  slug: string;
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
  slug: string;
  tagline: string;
  description: string;
  imageUrl: string;
  priceFromUsd: number | null;
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  startsAt: string;
  endsAt: string;
  vipPackages: { id: string; title: string; priceUsd: number | null; perks: string }[];
};

export type MagazinePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: string | null;
};

export type HomepageData = {
  apartmentRooms: ApartmentRoom[];
  bookBoats: BookBoat[];
  boatBookingGallery: GalleryImage[];
  gardens: GardenVenue[];
  events: EventItem[];
  magazine: MagazinePost[];
};
