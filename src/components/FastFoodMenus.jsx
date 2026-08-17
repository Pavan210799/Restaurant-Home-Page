import { useCart } from '../context/CartContext';
import './FastFoodMenus.css';

const menuItems = [
  {
    title: 'Shroom Bacon\nBurger',
    price: '$11.76',
    image: '/images/product-shroom-56586a.png',
  },
  {
    title: 'Delicious Black\nCoffee',
    price: '$11.76',
    image: '/images/product-coffee-56586a.png',
  },
  {
    title: 'BBQ Chicken\nPizza New',
    price: '$13.17',
    image: '/images/product-pizza-56586a.png',
  },
  {
    title: 'Crispy Fried\nChicken',
    price: '$15.10',
    image: '/images/product-wings.png',
  },
  {
    title: 'Zinger Double\nBurger',
    price: '$20.10',
    image: '/images/product-zinger-56586a.png',
  },
  {
    title: 'Margherita\nPizza New',
    price: '$15.80',
    image: '/images/margherita-pizza-547123.png',
  },
  {
    title: 'Crispy Fried\nChicken',
    price: '$10.85',
    image: '/images/product-wings.png',
  },
  {
    title: 'Black Pepper\nBurger',
    price: '$10.85',
    image: '/images/product-black-pepper-56586a.png',
  },
];

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const label = item.title.replace(/\n/g, ' ');

  return (
    <article className="menu-card">
      <div className="menu-card__white">
        <div className="menu-card__content">
          <h3 className="menu-card__title">
            {item.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h3>
          <span className="menu-card__price">{item.price}</span>
        </div>
        <button
          className="menu-card__cart"
          type="button"
          aria-label={`Add ${label} to bag`}
          onClick={() =>
            addToCart({ label, price: item.price, image: item.image })
          }
        >
          <i className="fa-solid fa-bag-shopping" />
        </button>
      </div>
      <div className="menu-card__accent" aria-hidden="true" />
      <img className="menu-card__image" src={item.image} alt={label} />
    </article>
  );
}

function FastFoodMenus() {
  return (
    <section id="menu" className="fast-food">
      <div className="fast-food__container">
        <div className="fast-food__header">
          <h2 className="fast-food__title">Fast Food Menus</h2>
          <div className="fast-food__underline" />
        </div>

        <div className="fast-food__grid">
          {menuItems.map((item, index) => (
            <MenuCard key={`${item.title}-${item.price}-${index}`} item={item} />
          ))}

          <div className="fast-food__opening">
            <h3 className="fast-food__opening-title">OPENING TIMES</h3>
            <div className="fast-food__opening-bar" />
            <div className="fast-food__hours">
              <span>Mon</span>
              <span>17:00 to 23:00</span>
            </div>
            <div className="fast-food__hours">
              <span>Tue</span>
              <span>17:00 to 23:00</span>
            </div>
            <div className="fast-food__phone-box">
              <p className="fast-food__phone">+1 234 567 891</p>
              <p className="fast-food__address">Avenue New Town 124 United State</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FastFoodMenus;
