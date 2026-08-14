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

function Categories() {
  return (
    <section className="categories">
      <div className="categories__container">
        <div className="categories__header">
          <h2 className="categories__title">Choose a Category</h2>
          <div className="categories__underline" />
        </div>

        <div className="categories__grid">
          {categories.map((cat) => (
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
          <button type="button" className="categories__dot categories__dot--active" aria-label="Slide 1" />
          <button type="button" className="categories__dot" aria-label="Slide 2" />
          <button type="button" className="categories__dot" aria-label="Slide 3" />
        </div>
      </div>
    </section>
  );
}

export default Categories;
