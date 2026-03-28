import { useState, useEffect, useMemo, useCallback } from 'react';
import weddingConfig from '../../config/weddingConfig';
import flowersImage from '../../assets/wedding-flowers.jpg';
import verticalFlower from '../../assets/flowers-vertical.jpg';
import ringsImage from '../../assets/rings.jpg';
import montrealPhoto from '../../assets/montreal.jpg';
import niagaraFallsPhoto from '../../assets/niagara-falls-high.jpg';
import chicagoBeanPhoto from '../../assets/chicago-bean.jpg';
import sanFranciscoPhoto from '../../assets/san-francisco.jpg';
import styles from './LoadingScreen.module.css';

const sectionImages: Record<string, string[]> = {
  rsvp: [ringsImage],
  viaggio: [montrealPhoto, niagaraFallsPhoto, chicagoBeanPhoto, sanFranciscoPhoto],
};

function getTargetSection(): string {
  const hash = window.location.hash.replace('#', '');
  if (hash) return hash;
  const params = new URLSearchParams(window.location.search);
  return params.get('section') ?? '';
}

function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          if (img.complete) resolve();
          else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        })
    )
  );
}

function fadeOutStaticLoader() {
  const el = document.getElementById('static-loader');
  if (!el) return;
  el.style.transition = 'opacity 0.5s ease';
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';
  setTimeout(() => el.remove(), 500);
}

interface LoadingScreenProps {
  children: React.ReactNode;
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [ready, setReady] = useState(false);

  const targetSection = useMemo(() => getTargetSection(), []);

  const imagesToLoad = useMemo(() => {
    const imgs = [flowersImage, verticalFlower];
    if (weddingConfig.hero.photoSrc) imgs.push(weddingConfig.hero.photoSrc);
    const extra = sectionImages[targetSection] ?? [];
    return [...imgs, ...extra];
  }, [targetSection]);

  // Disable smooth scroll so browser doesn't animate to hash
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    if (targetSection) window.scrollTo(0, 0);
  }, [targetSection]);

  // Preload images with a safety timeout
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 6000);
    preloadImages(imagesToLoad).then(() => {
      clearTimeout(timeout);
      setReady(true);
    });
    return () => clearTimeout(timeout);
  }, [imagesToLoad]);

  // Once ready: scroll to target behind the static loader, then fade it out
  const reveal = useCallback(() => {
    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }
    // Wait for browser to paint at the scroll position, then fade
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fadeOutStaticLoader();
        document.documentElement.style.scrollBehavior = '';
      });
    });
  }, [targetSection]);

  useEffect(() => {
    if (ready) reveal();
  }, [ready, reveal]);

  return (
    <div
      className={styles.content}
      style={{ visibility: ready ? 'visible' : 'hidden' }}
    >
      {children}
    </div>
  );
}
