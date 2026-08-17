import './About.css';

const features = [
  {
    icon: '/images/about-icon-order.svg',
    title: 'Online Food Ordering',
    description: 'Easy Food delivery from the best\nrestaurants.',
  },
  {
    icon: '/images/about-icon-healthy.svg',
    title: '100% Healthy Food',
    description: 'Eating a wide variety of nutritious Healthy\nfoods',
  },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__header">
          <p className="about__label">About The Food Restaurant</p>
          <h2 className="about__title">
            Perfect Place For An Exceptional
            <br />
            Experience
          </h2>
        </div>

        <div className="about__body">
          <div className="about__image-wrap">
            <img
              src="/images/images-bg-56586a.png"
              alt="Restaurant interior"
              className="about__image"
            />
          </div>

          <div className="about__content">
            <p className="about__text">
              Nisl quam nestibulum ac quam nec odio elementu sceisue
              the aucan ligula. Orci varius natoque pena culus mus
              nellentesque ha um ac quam nec odio aibulum ac quam nec
              odio elrbine.
            </p>

            <div className="about__features">
              {features.map((feature) => (
                <div key={feature.title} className="about__feature">
                  <img
                    src={feature.icon}
                    alt=""
                    className="about__feature-icon"
                    width={110}
                    height={110}
                  />
                  <div>
                    <h3 className="about__feature-title">{feature.title}</h3>
                    <p className="about__feature-desc">
                      {feature.description.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i === 0 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
