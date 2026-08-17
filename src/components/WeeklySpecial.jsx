import { useState } from 'react';
import './WeeklySpecial.css';

const tabs = [
  'Fish Vegetables',
  'Buffet Vegas',
  'Fish Fry Grilled',
  'Tasty Snacks',
  'Smoked Chicke',
];

const features = [
  'Fresh & Tasty',
  'Best in organic foods',
  '100 Fresh Ingredients',
  'Better for your Health',
];

function WeeklySpecial() {
  const [activeTab, setActiveTab] = useState('Buffet Vegas');
  const [direction, setDirection] = useState(1);

  const selectTab = (tab) => {
    if (tab === activeTab) return;
    const prevIndex = tabs.indexOf(activeTab);
    const nextIndex = tabs.indexOf(tab);
    setDirection(nextIndex >= prevIndex ? 1 : -1);
    setActiveTab(tab);
  };

  return (
    <section id="deals" className="weekly-special">
      <div className="weekly-special__container">
        <p className="weekly-special__label">Weekly Special</p>
        <h2 className="weekly-special__title">Best Seller Deals</h2>

        <div className="weekly-special__stage">
          <div className="weekly-special__row">
            <ul className="weekly-special__menu">
              {tabs.map((tab) => (
                <li key={tab} className="weekly-special__menu-item">
                  <button
                    type="button"
                    className={`weekly-special__tab${
                      activeTab === tab ? ' weekly-special__tab--active' : ''
                    }`}
                    onClick={() => selectTab(tab)}
                  >
                    <span className="weekly-special__tab-bullet" aria-hidden="true" />
                    <span>{tab}</span>
                  </button>
                </li>
              ))}
            </ul>

            <img
              key={activeTab}
              className="weekly-special__image weekly-special__swap"
              style={{ '--tab-dir': direction }}
              src="/images/buffet-vegas-56586a.png"
              alt={activeTab}
            />
          </div>

          <div className="weekly-special__panel">
            <div
              key={activeTab}
              className="weekly-special__content weekly-special__swap"
              style={{ '--tab-dir': direction }}
            >
              <h3 className="weekly-special__dish-title">{activeTab}</h3>

              <ul className="weekly-special__features">
                {features.map((feature) => (
                  <li key={feature} className="weekly-special__feature">
                    <i className="fa-solid fa-check weekly-special__check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="weekly-special__pricing">
                <span className="weekly-special__price">$10.85</span>
                <span className="weekly-special__old-price">$14.85</span>
              </p>

              <a href="#complimentary" className="weekly-special__btn">
                <span className="weekly-special__btn-border" aria-hidden="true" />
                Product
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeeklySpecial;
