import { useAuth } from '../context/AuthContext';
import './AuthCelebration.css';

const PIECES = [
  '#ffd40d',
  '#f3274c',
  '#00a149',
  '#ffffff',
  '#ffb347',
  '#6b3a2a',
];

function AuthCelebration() {
  const { celebrate } = useAuth();
  if (!celebrate) return null;

  return (
    <div className="auth-celebration" aria-hidden="true">
      {Array.from({ length: 36 }, (_, index) => (
        <span
          key={index}
          className="auth-celebration__piece"
          style={{
            '--i': index,
            '--c': PIECES[index % PIECES.length],
            '--x': `${(index % 12) * 8 - 44}px`,
            '--r': `${(index * 47) % 360}deg`,
          }}
        />
      ))}
      <p className="auth-celebration__msg" role="status" aria-live="polite">
        Welcome to TasteNest!
      </p>
    </div>
  );
}

export default AuthCelebration;
