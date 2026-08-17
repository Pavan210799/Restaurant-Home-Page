import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './SplashScreen.css';

function SplashScreen({ message = 'Preparing something delicious…', onDone }) {
  const [phase, setPhase] = useState('enter'); // enter | exit
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';

    const exitTimer = window.setTimeout(() => setPhase('exit'), 2600);
    const doneTimer = window.setTimeout(() => onDone(), 3200);

    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`splash${phase === 'exit' ? ' splash--exit' : ''}`}
      role="dialog"
      aria-live="polite"
      aria-label={message}
    >
      <span className="splash__glow splash__glow--left" aria-hidden="true" />
      <span className="splash__glow splash__glow--right" aria-hidden="true" />

      <div className="splash__inner">
        <div className="splash__brand" aria-label="TasteNest">
          <img
            src="/images/logo-69d896.png"
            alt="TasteNest"
            className="splash__logo"
            width={180}
            height={88}
          />
        </div>

        <div className="splash__burger" aria-hidden="true">
          <span className="splash__bun splash__bun--top" />
          <span className="splash__fill splash__fill--lettuce" />
          <span className="splash__fill splash__fill--patty" />
          <span className="splash__fill splash__fill--cheese" />
          <span className="splash__bun splash__bun--bottom" />
        </div>

        <p className="splash__text">{message}</p>

        <div className="splash__bar">
          <span className="splash__bar-fill" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default SplashScreen;
