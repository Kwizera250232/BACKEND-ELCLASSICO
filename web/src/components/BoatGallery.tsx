import type { GalleryImage } from '@/lib/types';

type Props = {
  images: GalleryImage[];
};

export function BoatGallery({ images }: Props) {
  return (
    <div className="gallery-grid">
      {images.map((image) => (
        <figure key={image.id} className="gallery-item">
          <img src={image.imageUrl} alt={image.caption ?? 'Boat booking gallery'} loading="lazy" />
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
