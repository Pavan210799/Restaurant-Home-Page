import { useState } from 'react';
import './Categories.css';

const categories = [
  {
    image: '/images/category-organic-56586a.png',
    title: 'Organic Food',
    count: '12 Dishes in the Menu',
  },
  {
    image: '/images/category-burger-56586a.png',
    title: 'Zinger Burgers',
    count: '04 Dishes in the Menu',
  },
  {
    image: '/images/category-grill-56586a.png',
    title: 'Grill Food',
    count: '12 Dishes in the Menu',
  },
  {
    image: '/images/category-bbq-56586a.png',
    title: 'Bar B Q',
    count: '12 Dishes in the Menu',
  },
];

/* Figma gives this row three dots for four categories, so each page rotates the
   same set by one card rather than introducing categories we do not have. */
const PAGE_COUNT = 3;

function Categories() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    if (index === page) return;
    setDirection(index > page ? 1 : -1);
    setPage(index);
  };

  const visible = categories.map(
    (_, index) => categories[(index + page) % categories.length],
  );

  return (
    <section id="categories" className="categories">
      <div className="categories__container">
        <div className="categories__header">
          <h2 className="categories__title">Choose a Category</h2>
          <div className="categories__underline" />
        </div>

        <div
          className="categories__grid"
          key={page}
          style={{ '--categories-dir': direction }}
        >
          {visible.map((cat) => (
            <div key={cat.title} className="categories__card">
              <div className="categories__card-image-wrap">
                <img src={cat.image} alt={cat.title} className="categories__card-image" />
                <div className="categories__card-overlay" />
              </div>
              <h3 className="categories__card-title">{cat.title}</h3>
              <p className="categories__card-count">{cat.count}</p>
            </div>
          ))}
        </div>

        <div className="categories__dots">
          {Array.from({ length: PAGE_COUNT }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`categories__dot${
                index === page ? ' categories__dot--active' : ''
              }`}
              aria-label={`Slide ${index + 1}`}
              aria-current={index === page ? 'true' : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
