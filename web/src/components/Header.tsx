const NAV = [
  { href: '#apartments', label: 'Apartments' },
  { href: '#boats', label: 'Boats' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#garden', label: 'Garden' },
  { href: '#events', label: 'Events' },
  { href: '#magazine', label: 'Magazine' },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="logo-block">
        <h1>EL CLASSICO</h1>
        <p>Beach &amp; Lake Resort — Gisenyi, Rwanda</p>
      </div>
      <nav className="main-nav" aria-label="Main">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="btn-outline" href="#apartments">
          Book Now
        </a>
        <div className="lang-switch" aria-label="Language">
          <span className="active">EN</span>
          <span>FR</span>
        </div>
      </div>
    </header>
  );
}
