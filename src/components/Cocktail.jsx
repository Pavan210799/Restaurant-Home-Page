import { useCart } from '../context/CartContext';
import './Cocktail.css';

const products = [
  {
    title: 'Crispy Fried\nChicken',
    weight: '100 grams',
    oldPrice: '$14.85',
    price: '$10.85',
    image: '/images/crispy-chicken-547123.png',
  },
  {
    title: 'BBQ Chicken Pizza\nNew',
    weight: '100 grams',
    price: '$13.17',
    image: '/images/bbq-pizza-new-547123.png',
  },
  {
    title: 'Delicious Black\nCoffee',
    weight: '100 grams',
    oldPrice: '$21.76',
    price: '$11.76',
    image: '/images/black-coffee-547123.png',
  },
  {
    title: 'Margherita Pizza\nNew',
    weight: '100 grams',
    price: '$15.80',
    image: '/images/margherita-pizza-547123.png',
  },
];

function Cocktail() {
  const { addToCart } = useCart();

  return (
    <section id="complimentary" className="cocktail">
      <div className="cocktail__container">
        <h2 className="cocktail__title">
          A Complimentary Cocktail, Coffee,
          <br />
          Ice-Tea For You.
        </h2>
        <p className="cocktail__subtitle">
          Enjoy a Cosmopolitian or a non-alcoholic espresso martini.
        </p>

        <div className="cocktail__grid">
          {products.map((item) => {
            const label = item.title.replace(/\n/g, ' ');
            return (
              <article key={item.title} className="cocktail__card">
                <div className="cocktail__card-white" />
                <div className="cocktail__card-accent" />
                <img
                  className="cocktail__card-image"
                  src={item.image}
                  alt={label}
                />

                <div className="cocktail__card-body">
                  <p className="cocktail__weight">{item.weight}</p>
                  <h3 className="cocktail__card-title">
                    {item.title.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h3>
                  <div className="cocktail__prices">
                    {item.oldPrice && (
                      <span className="cocktail__old-price">{item.oldPrice}</span>
                    )}
                    <span className="cocktail__price">{item.price}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cocktail__cart"
                  aria-label={`Add ${label} to bag`}
                  onClick={() =>
                    addToCart({ label, price: item.price, image: item.image })
                  }
                >
                  <i className="fa-solid fa-bag-shopping" />
                </button>
              </article>
            );
          })}
        </div>

        <p className="cocktail__booking">
          Booking Calling 24/7:{' '}
          <span className="cocktail__booking-phone">+12 345 67890</span>
        </p>
      </div>
    </section>
  );
}

export default Cocktail;
