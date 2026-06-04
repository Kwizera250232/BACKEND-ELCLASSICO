type Card = {
  id: string;
  tierLabel: string | null;
  title: string;
  imageUrl: string | null;
  priceUsd: number | null;
  priceSuffix?: string;
};

type Props = {
  items: Card[];
  priceSuffix?: string;
};

export function PriceCards({ items, priceSuffix = ' / night' }: Props) {
  return (
    <div className="card-grid">
      {items.map((item) => (
        <article key={item.id} className="price-card">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${item.imageUrl ?? ''})`,
            }}
            role="img"
            aria-label={item.title}
          />
          <div className="content">
            {item.tierLabel ? <p className="tier">{item.tierLabel}</p> : null}
            <h3>{item.title}</h3>
            <p className="price">
              ${item.priceUsd ?? '—'}
              {item.priceSuffix ?? priceSuffix}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
