import './Services.css';

const services = [
  {
    image: '/images/tea-pot-56586a.png',
    title: 'Afternoon Tea',
    description: 'Nisl quam nestibulum ac quam nec au\ngula Orci variusNisl quam nesti.',
  },
  {
    image: '/images/juice-56586a.png',
    title: 'Wine & Cocktails',
    description: 'Nisl quam nestibulum ac quam nec au\ngula Orci variusNisl quam nesti.',
  },
  {
    image: '/images/coffee-shop-56586a.png',
    title: 'Takeaway & Delivery',
    description: 'Nisl quam nestibulum ac quam nec au\ngula Orci variusNisl quam nesti.',
  },
  {
    image: '/images/doughnut-56586a.png',
    title: 'Alfresco Dining',
    description: 'Nisl quam nestibulum ac quam nec au\ngula Orci variusNisl quam nesti.',
  },
];

function Services() {
  return (
    <section id="services" className="services">
      <div className="services__container">
        <div className="services__left">
          <p className="services__label">Food Servicesa</p>
          <h2 className="services__title">
            We Provide Best
            <br />
            Services
          </h2>

          <div className="services__grid">
            {services.map((service) => (
              <div key={service.title} className="services__card">
                <div className="services__icon-wrap">
                  <div className="services__icon-outer">
                    <div className="services__icon-inner">
                      <img src={service.image} alt={service.title} />
                    </div>
                  </div>
                </div>
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-desc">
                  {service.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="services__right">
          <img
            src="/images/bhindi-curry-56586a.png"
            alt="Bhindi Curry"
            className="services__featured"
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
