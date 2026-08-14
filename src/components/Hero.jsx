import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <span className="hero__blob" aria-hidden="true" />

      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__subtitle">Fastest Delivery &amp; Easy Pickup</p>
          <h1 className="hero__title">Kings Burger</h1>
          <p className="hero__description">
            Good food starts with good ingridients. We only
            <br />
            bring you the best.
          </p>

          <div className="hero__actions">
            <button className="hero__btn">
              <span className="hero__btn-border" aria-hidden="true" />
              View Our Menu
            </button>
            <img
              className="hero__stars"
              src="/images/rating-56586a.png"
              alt="5 star rating"
            />
            <span className="hero__score">4.8</span>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="/images/burger-hero-56586a.png"
            alt="Delicious burger"
            className="hero__burger"
          />
          <img
            src="/images/discount-56586a.png"
            alt="Up to 20% discount"
            className="hero__discount"
          />
        </div>
      </div>

      <button className="hero__arrow hero__arrow--prev" aria-label="Previous slide">
        <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="white" />
          <path
            d="M51.7472 36.8717C52.065 37.1895 52.2239 37.5753 52.2239 38.0293C52.2239 38.4378 52.065 38.8237 51.7472 39.1868L50.5897 40.2763C50.2719 40.6395 49.886 40.821 49.4321 40.821C49.0235 40.821 48.6604 40.6395 48.3426 40.2763L39.0821 31.0838C38.7643 30.7661 38.6054 30.3802 38.6054 29.9263C38.6054 29.4723 38.7643 29.0865 39.0821 28.7687L48.3426 19.5762C48.6604 19.2131 49.0235 19.0315 49.4321 19.0315C49.886 19.0315 50.2719 19.2131 50.5897 19.5762L51.7472 20.6657C52.065 21.0289 52.2239 21.4374 52.2239 21.8914C52.2239 22.2999 52.065 22.6631 51.7472 22.9809L47.3212 27.4749H67.4766C67.9305 27.4749 68.3164 27.6338 68.6341 27.9516C68.9519 28.2694 69.1108 28.6552 69.1108 29.1092V30.7434C69.1108 31.1973 68.9519 31.5832 68.6341 31.9009C68.3164 32.2187 67.9305 32.3776 67.4766 32.3776H47.3212L51.7472 36.8717Z"
            fill="white"
          />
        </svg>
      </button>
      <button className="hero__arrow hero__arrow--next" aria-label="Next slide">
        <svg width="69" height="60" viewBox="0 0 69 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="9.36328" y="0.5" width="59" height="59" rx="29.5" stroke="white" />
          <path
            d="M17.4316 22.9023C17.1126 22.5833 16.9531 22.2188 16.9531 21.8086C16.9531 21.3529 17.1126 20.9427 17.4316 20.5781L18.5937 19.4844C18.9127 19.1198 19.2773 18.9375 19.6875 18.9375C20.1432 18.9375 20.5306 19.1198 20.8496 19.4844L30.1464 28.7129C30.4655 29.0319 30.625 29.4193 30.625 29.875C30.625 30.3307 30.4655 30.7181 30.1464 31.0371L20.8496 40.2656C20.5306 40.6302 20.1432 40.8125 19.6875 40.8125C19.2773 40.8125 18.9127 40.6302 18.5937 40.2656L17.4316 39.1719C17.1126 38.8073 16.9531 38.4199 16.9531 38.0098C16.9531 37.554 17.1126 37.1667 17.4316 36.8477L21.875 32.3359H1.64059C1.18486 32.3359 0.797487 32.1764 0.478477 31.8574C0.159466 31.5384 -3.91006e-05 31.151 -3.91006e-05 30.6953V29.0547C-3.91006e-05 28.599 0.159466 28.2116 0.478477 27.8926C0.797487 27.5736 1.18486 27.4141 1.64059 27.4141H21.875L17.4316 22.9023Z"
            fill="white"
          />
        </svg>
      </button>

      <div className="hero__bullets">
        <span className="hero__bullet hero__bullet--active" />
        <span className="hero__bullet" />
        <span className="hero__bullet" />
      </div>
    </section>
  );
}

export default Hero;
