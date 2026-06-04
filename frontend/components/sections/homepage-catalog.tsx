'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { HomepagePayload } from '@/lib/homepage-api';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PriceCard({
  image,
  tier,
  title,
  price,
  suffix = '/ night',
}: {
  image: string;
  tier?: string | null;
  title: string;
  price: number | null;
  suffix?: string;
}) {
  return (
    <article className="group relative min-h-[380px] overflow-hidden border border-white/10 bg-[#030a10]">
      <Image src={image} alt={title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        {tier ? (
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.28em] text-gold">{tier}</p>
        ) : null}
        <h3 className="mt-2 font-[var(--font-heading)] text-3xl leading-none">{title}</h3>
        <p className="mt-3 text-2xl font-semibold text-gold">
          <span className="text-3xl">${price ?? '—'}</span>
          <span className="text-base font-bold uppercase tracking-[0.12em] text-white/80">{suffix}</span>
        </p>
      </div>
    </article>
  );
}

export function HomepageCatalog({ homepage }: { homepage: HomepagePayload }) {
  return (
    <>
      <section id="apartments" className="scroll-mt-24 bg-[#030a10] px-4 pb-16 pt-28 sm:px-5 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <p className="text-center text-[0.67rem] font-bold uppercase tracking-[0.36em] text-gold">Stay with us</p>
            <h2 className="mt-4 text-center font-[var(--font-heading)] text-5xl font-semibold text-cream md:text-6xl">
              Apartment Rooms
            </h2>
            <span className="mx-auto mt-6 block h-px w-28 bg-gold" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {homepage.apartmentRooms.map((room, index) => (
              <Reveal key={room.id} delay={index * 0.06}>
                <PriceCard
                  image={room.imageUrl ?? homepage.apartmentRooms[0]?.imageUrl ?? ''}
                  tier={room.tierLabel}
                  title={room.title}
                  price={room.priceUsd}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="boats" className="bg-cream px-4 py-16 sm:px-5 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <p className="text-center text-[0.67rem] font-bold uppercase tracking-[0.36em] text-ocean">Lake Kivu</p>
            <h2 className="mt-4 text-center font-[var(--font-heading)] text-5xl font-semibold text-abyss md:text-6xl">
              Book Boats
            </h2>
            <span className="mx-auto mt-6 block h-px w-28 bg-gold" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {homepage.bookBoats.map((boat, index) => (
              <Reveal key={boat.id} delay={index * 0.06}>
                <PriceCard
                  image={boat.imageUrl}
                  tier={boat.tierLabel}
                  title={boat.title}
                  price={boat.priceUsd}
                  suffix={` USD ${boat.priceLabel}`}
                />
                <p className="mt-3 text-center text-sm leading-7 text-slate-600">{boat.description}</p>
                <div className="mt-4 text-center">
                  <a
                    href="#contact"
                    className="inline-flex border border-abyss px-6 py-3 text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-abyss transition hover:border-gold hover:bg-gold"
                  >
                    Book Boat
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white px-4 py-16 sm:px-5 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <p className="text-center text-[0.67rem] font-bold uppercase tracking-[0.36em] text-ocean">On the water</p>
            <h2 className="mt-4 text-center font-[var(--font-heading)] text-5xl font-semibold text-abyss md:text-6xl">
              Gallery of Book
            </h2>
            <span className="mx-auto mt-6 block h-px w-28 bg-gold" />
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homepage.boatBookingGallery.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.04}>
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.imageUrl} alt={item.caption ?? 'Boat gallery'} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                  {item.caption ? (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs font-bold uppercase tracking-[0.2em] text-white">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="garden" className="bg-cream px-4 py-16 sm:px-5 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <p className="text-center text-[0.67rem] font-bold uppercase tracking-[0.36em] text-ocean">Outdoor elegance</p>
            <h2 className="mt-4 text-center font-[var(--font-heading)] text-5xl font-semibold text-abyss md:text-6xl">
              Garden
            </h2>
            <span className="mx-auto mt-6 block h-px w-28 bg-gold" />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {homepage.gardens.map((garden, index) => (
              <Reveal key={garden.id} delay={index * 0.06}>
                <article className="border border-abyss/10 bg-white">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={garden.imageUrl} alt={garden.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">{garden.tagline}</p>
                    <h3 className="mt-3 font-[var(--font-heading)] text-3xl text-abyss">{garden.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{garden.description}</p>
                    {garden.priceFromUsd ? (
                      <p className="mt-4 text-gold">From ${garden.priceFromUsd} USD</p>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="bg-abyss px-4 py-16 sm:px-5 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <p className="text-center text-[0.67rem] font-bold uppercase tracking-[0.36em] text-gold">What&apos;s on</p>
            <h2 className="mt-4 text-center font-[var(--font-heading)] text-5xl font-semibold text-cream md:text-6xl">
              Events &amp; Magazine
            </h2>
            <span className="mx-auto mt-6 block h-px w-28 bg-gold" />
          </Reveal>
          {homepage.events.length > 0 ? (
            <div className="mt-12 space-y-8">
              {homepage.events.map((event) => (
                <Reveal key={event.id}>
                  <article className="grid gap-6 border border-white/10 bg-white/5 p-6 lg:grid-cols-[280px_1fr]">
                    {event.coverImageUrl ? (
                      <div className="relative h-48 overflow-hidden lg:h-auto">
                        <Image src={event.coverImageUrl} alt="" fill className="object-cover" sizes="280px" />
                      </div>
                    ) : null}
                    <div className="text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                        {new Date(event.startsAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <h3 className="mt-2 font-[var(--font-heading)] text-3xl">{event.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/70">{event.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-white/60">Upcoming events will be announced soon.</p>
          )}
          {homepage.magazine.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {homepage.magazine.map((post) => (
                <Reveal key={post.id}>
                  <a href={`/blog/${post.slug}`} className="group grid gap-4 border border-white/10 bg-white/5 p-4 sm:grid-cols-[140px_1fr]">
                    {post.coverImage ? (
                      <div className="relative aspect-square overflow-hidden">
                        <Image src={post.coverImage} alt="" fill className="object-cover transition group-hover:scale-105" sizes="140px" />
                      </div>
                    ) : null}
                    <div className="text-white">
                      <h3 className="font-[var(--font-heading)] text-2xl">{post.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/65">{post.excerpt}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center">
              <a href="/blog" className="text-sm font-bold uppercase tracking-[0.24em] text-gold">
                Read El Classico Magazine
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
