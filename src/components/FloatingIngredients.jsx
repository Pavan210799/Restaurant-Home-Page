import './FloatingIngredients.css';

const items = [
  { className: 'float-ingredient--tomato', emoji: '🍅', top: '18%', left: '8%', delay: '0s' },
  { className: 'float-ingredient--leaf', emoji: '🥬', top: '62%', left: '12%', delay: '0.8s' },
  { className: 'float-ingredient--cheese', emoji: '🧀', top: '28%', right: '10%', delay: '0.4s' },
  { className: 'float-ingredient--fries', emoji: '🍟', top: '70%', right: '14%', delay: '1.2s' },
  { className: 'float-ingredient--pepper', emoji: '🌶️', top: '45%', left: '4%', delay: '1.6s' },
];

function FloatingIngredients() {
  return (
    <div className="float-ingredients" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.emoji}
          className={`float-ingredient ${item.className}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            animationDelay: item.delay,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}

export default FloatingIngredients;
