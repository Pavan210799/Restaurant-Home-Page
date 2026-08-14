import { useEffect, useRef } from 'react';
import './Instagram.css';

const instagramImages = [
  '/images/insta1-9f3704.png',
  '/images/insta2-9f3704.png',
  '/images/insta3-9f3704.png',
  '/images/insta4-9f3704.png',
  '/images/insta5-9f3704.png',
];

const CAROUSEL_BREAKPOINT = 1024;
const INSTAGRAM_URL = 'https://www.instagram.com/accounts/login/';

function Instagram() {
  const trackRef = useRef(null);

  useEffect(() => {
    let lastWidth = window.innerWidth;

    const centerMiddleTile = () => {
      const track = trackRef.current;
      if (!track || window.innerWidth > CAROUSEL_BREAKPOINT) return;

      const middle = track.children[Math.floor(instagramImages.length / 2)];
      if (!middle) return;

      track.scrollLeft =
        middle.offsetLeft - (track.clientWidth - middle.clientWidth) / 2;
    };

    // Height-only resizes (mobile browser chrome) must not yank the scroll back
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      centerMiddleTile();
    };

    centerMiddleTile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="instagram">
      <div className="instagram__header">
        <div className="instagram__icon-wrap">
          <i className="fa-brands fa-instagram instagram__icon" />
        </div>
        <h2 className="instagram__title">Follow BravisThemes</h2>
        <p className="instagram__subtitle">
          Join our community to inspire your desires
        </p>
      </div>

      <div className="instagram__grid" ref={trackRef}>
        {instagramImages.map((src, index) => (
          <a
            key={src}
            href={INSTAGRAM_URL}
            className="instagram__item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={src} alt={`Instagram post ${index + 1}`} className="instagram__image" />
            <div className="instagram__overlay">
              <i className="fa-brands fa-instagram" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Instagram;
