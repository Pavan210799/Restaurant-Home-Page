import './HowWeWork.css';

const steps = [
  {
    icon: '/images/step-menu-56586a.png',
    number: '1',
    title: 'Explore Menu',
    description:
      'A range of powerful tools for\nviewing, querying and filtering\nyour data.',
  },
  {
    icon: '/images/step-dish-56586a.png',
    number: '2',
    title: 'Choose a Dish',
    description:
      'A range of powerful tools for\nviewing, querying and filtering\nyour data.',
  },
  {
    icon: '/images/step-order-56586a.png',
    number: '3',
    title: 'Place Order',
    description:
      'A range of powerful tools for\nviewing, querying and filtering\nyour data.',
  },
];

function HowWeWork() {
  return (
    <section id="how-we-work" className="how-we-work">
      <img
        className="how-we-work__bg"
        src="/images/how-we-work-bg-808e5a.png"
        alt=""
      />

      <div className="how-we-work__video-layer" aria-hidden="true">
        <div className="how-we-work__video-wrap">
          <img
            className="how-we-work__video-thumb"
            src="/images/video-thumb-56586a.png"
            alt=""
          />
          <span className="how-we-work__circle" />

          <p className="how-we-work__watch-label">Watch and Follow</p>
          <img
            className="how-we-work__watch-img"
            src="/images/watch-follow-56586a.png"
            alt=""
            width={157}
            height={120}
          />
        </div>
      </div>

      <div className="how-we-work__inner">
        <div className="how-we-work__main">
          <p className="how-we-work__label">Easy Order In 3 Steps</p>
          <h2 className="how-we-work__title">How We Work</h2>

          <div className="how-we-work__steps">
            {steps.map((step) => (
              <div key={step.number} className="how-we-work__step">
                <div className="how-we-work__icon-wrap">
                  <div className="how-we-work__icon-outer">
                    <div className="how-we-work__icon-inner">
                      <img src={step.icon} alt={step.title} />
                    </div>
                  </div>
                  <span className="how-we-work__number">{step.number}</span>
                </div>
                <h3 className="how-we-work__step-title">{step.title}</h3>
                <p className="how-we-work__step-desc">
                  {step.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < 2 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowWeWork;
