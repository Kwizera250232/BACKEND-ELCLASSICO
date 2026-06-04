import { BoatBookingForm } from '@/components/BoatBookingForm';
import { BoatGallery } from '@/components/BoatGallery';
import { Header } from '@/components/Header';
import { PriceCards } from '@/components/PriceCards';
import { fetchHomepage } from '@/lib/api';

function formatEventDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function HomePage() {
  const data = await fetchHomepage();

  const boatCards = data.bookBoats.map((boat) => ({
    id: boat.id,
    tierLabel: boat.tierLabel,
    title: boat.title,
    imageUrl: boat.imageUrl,
    priceUsd: boat.priceUsd,
    priceSuffix: ` USD ${boat.priceLabel}`,
  }));

  const gardenCards = data.gardens.map((garden) => ({
    id: garden.id,
    tierLabel: garden.tagline,
    title: garden.title,
    imageUrl: garden.imageUrl,
    priceUsd: garden.priceFromUsd,
    priceSuffix: ' USD from',
  }));

  const apartmentCards = data.apartmentRooms.map((room) => ({
    id: room.id,
    tierLabel: room.tierLabel,
    title: room.title,
    imageUrl: room.imageUrl,
    priceUsd: room.priceUsd,
  }));

  return (
    <>
      <Header />

      <main>
        <section id="apartments" className="section" aria-labelledby="apartments-heading">
          <div className="section-head">
            <span className="eyebrow">Stay with us</span>
            <h2 id="apartments-heading">Apartment Rooms</h2>
            <p>Comfortable lakeside suites — Standard, Classic, and Prestige.</p>
          </div>
          <PriceCards items={apartmentCards} />
        </section>

        <section id="boats" className="section" aria-labelledby="boats-heading">
          <div className="section-head">
            <span className="eyebrow">Lake Kivu</span>
            <h2 id="boats-heading">Book Boats</h2>
            <p>Cruises, fishing charters, and private yacht experiences.</p>
          </div>
          <PriceCards items={boatCards} priceSuffix=" USD per trip" />
          <BoatBookingForm boats={data.bookBoats} />
        </section>

        <section id="gallery" className="section" aria-labelledby="gallery-heading">
          <div className="section-head">
            <span className="eyebrow">Moments on the water</span>
            <h2 id="gallery-heading">Gallery of Book</h2>
            <p>Scenes from our boat bookings and lake excursions.</p>
          </div>
          <BoatGallery images={data.boatBookingGallery} />
        </section>

        <section id="garden" className="section" aria-labelledby="garden-heading">
          <div className="section-head">
            <span className="eyebrow">Outdoor elegance</span>
            <h2 id="garden-heading">Garden</h2>
            <p>Ubukwe weddings, private dining, and terrace events.</p>
          </div>
          <PriceCards items={gardenCards} priceSuffix="" />
        </section>

        <section id="events" className="section" aria-labelledby="events-heading">
          <div className="section-head">
            <span className="eyebrow">What&apos;s on</span>
            <h2 id="events-heading">Events</h2>
            <p>Live music, VIP nights, and lakeside celebrations.</p>
          </div>
          {data.events.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              Upcoming events will be announced soon.
            </p>
          ) : (
            data.events.map((event) => (
              <article key={event.id} className="event-card">
                {event.coverImageUrl ? (
                  <img src={event.coverImageUrl} alt="" loading="lazy" />
                ) : (
                  <div />
                )}
                <div>
                  <p className="event-meta">{formatEventDate(event.startsAt)}</p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.75rem',
                      fontWeight: 400,
                      margin: '0.25rem 0 0.75rem',
                    }}
                  >
                    {event.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>{event.description}</p>
                  {event.vipPackages.length > 0 ? (
                    <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--gold)' }}>
                      {event.vipPackages.map((pkg) => (
                        <li key={pkg.id}>
                          {pkg.title} — ${pkg.priceUsd} ({pkg.perks})
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </section>

        <section id="magazine" className="section" aria-labelledby="magazine-heading">
          <div className="section-head">
            <span className="eyebrow">Stories &amp; inspiration</span>
            <h2 id="magazine-heading">Magazine</h2>
            <p>Guides, celebrations, and life at El Classico.</p>
          </div>
          {data.magazine.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              New magazine articles coming soon.
            </p>
          ) : (
            <div className="magazine-grid">
              {data.magazine.map((post) => (
                <article key={post.id} className="magazine-card">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt="" loading="lazy" />
                  ) : (
                    <div />
                  )}
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} El Classico Beach &amp; Lake Resort — Gisenyi, Rwanda</p>
      </footer>
    </>
  );
}
