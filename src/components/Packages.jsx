import './Packages.css';

const packages = [
  {
    title: "Valentine's Day\nPrivate Table",
    features: [
      'Candle Light Dinner',
      'Red Wine',
      'Romantic Music',
      'Quality Food',
    ],
    image: '/images/valentine-56586a.png',
  },
  {
    title: 'Birthday Party\nEvent Special',
    features: [
      'Balloons for decorations',
      'Cake and Pastries',
      'Soft Drink',
      'Dinner and Chocolates',
    ],
    image: '/images/birthday-56586a.png',
  },
];

function Packages() {
  return (
    <section className="packages">
      <div className="packages__container">
        <div className="packages__header">
          <p className="packages__label">PACKAGES</p>
          <h2 className="packages__title">
            A Collection of Unique
            <br />
            Experiences
          </h2>
        </div>

        <div className="packages__grid">
          {packages.map((pkg) => (
            <article key={pkg.title} className="packages__card">
              <div className="packages__info">
                <div className="packages__info-circle">
                  <div className="packages__info-inner">
                    <h3 className="packages__card-title">
                      {pkg.title.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i === 0 && <br />}
                        </span>
                      ))}
                    </h3>
                    <ul className="packages__features">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="packages__feature">
                          <span className="packages__bullet" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <img
                className="packages__image"
                src={pkg.image}
                alt={pkg.title.replace('\n', ' ')}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;
