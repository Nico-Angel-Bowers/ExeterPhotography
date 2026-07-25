import React, { useState, useEffect, useRef, useId } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import './styles.css';

// --- Types ---
interface CollectionImage {
  url: string;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  offset: 'none' | 'top' | 'bottom';
}

interface Portfolio {
  id: string;
  title: string;
  coverImage: string;
  images: CollectionImage[];
}

interface Photographer {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  portfolios: Portfolio[];
  isFeatured?: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: CollectionImage[];
  photographerAttribution?: string;
}

// --- Image Data Collections ---
// Stripping all descriptions and titles for photo entries

const NICO_BOWERS_IMAGES: CollectionImage[] = [
  { url: '/images/jazz-cafe/01.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/jazz-cafe/02.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/jazz-cafe/03.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/jazz-cafe/04.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/jazz-cafe/05.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/jazz-cafe/06.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/jazz-cafe/07.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/jazz-cafe/08.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/jazz-cafe/09.jpeg', title: '', description: '', size: 'small', offset: 'none' }
];

const TRAVEL_IMAGES: CollectionImage[] = [
  { url: '/images/travel/01.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/travel/02.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/travel/03.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/travel/04.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/travel/05.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/travel/06.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/travel/07.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/travel/08.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/travel/09.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/travel/10.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/travel/11.jpeg', title: '', description: '', size: 'small', offset: 'none' }
];

const PAXTON_HOPE_IMAGES: CollectionImage[] = [
  { url: '/images/paxton-hope/01.png', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/paxton-hope/02.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/paxton-hope/03.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/paxton-hope/04.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/paxton-hope/05.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/paxton-hope/06.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/paxton-hope/07.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/paxton-hope/08.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/paxton-hope/09.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/paxton-hope/10.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/paxton-hope/11.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/paxton-hope/12.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/paxton-hope/13.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/paxton-hope/14.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/paxton-hope/15.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/paxton-hope/16.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/paxton-hope/17.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/paxton-hope/18.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/paxton-hope/19.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' }
];

const FLYNN_KOHUT_IMAGES: CollectionImage[] = [
  { url: '/images/flynn-kohut/01.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/flynn-kohut/02.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/flynn-kohut/03.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/flynn-kohut/04.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/flynn-kohut/05.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/flynn-kohut/06.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/flynn-kohut/07.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/flynn-kohut/08.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/flynn-kohut/09.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/flynn-kohut/10.jpeg', title: '', description: '', size: 'medium', offset: 'top' }
];

const AALEYA_GANGULY_IMAGES: CollectionImage[] = [
  { url: '/images/aaleya-ganguly/01.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/aaleya-ganguly/02.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/aaleya-ganguly/03.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/aaleya-ganguly/04.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/aaleya-ganguly/05.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/aaleya-ganguly/06.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/aaleya-ganguly/07.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/aaleya-ganguly/08.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/aaleya-ganguly/09.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/aaleya-ganguly/10.jpeg', title: '', description: '', size: 'medium', offset: 'none' }
];

const PHILADELPHIA_ART_SHOW_IMAGES: CollectionImage[] = [
  { url: '/images/philadelphia-art-show/01.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/philadelphia-art-show/02.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/philadelphia-art-show/03.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/philadelphia-art-show/04.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/philadelphia-art-show/05.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/philadelphia-art-show/06.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/philadelphia-art-show/07.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/philadelphia-art-show/08.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/philadelphia-art-show/09.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/philadelphia-art-show/10.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/philadelphia-art-show/11.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' }
];

const GORDON_IMAGES: CollectionImage[] = [
  { url: '/images/gordon/01.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/gordon/02.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/gordon/03.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/gordon/04.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/gordon/05.jpeg', title: '', description: '', size: 'medium', offset: 'none' },
  { url: '/images/gordon/06.jpeg', title: '', description: '', size: 'large', offset: 'none' },
  { url: '/images/gordon/07.jpeg', title: '', description: '', size: 'small', offset: 'none' },
  { url: '/images/gordon/08.jpeg', title: '', description: '', size: 'medium', offset: 'top' },
  { url: '/images/gordon/09.jpeg', title: '', description: '', size: 'medium', offset: 'bottom' },
  { url: '/images/gordon/10.jpeg', title: '', description: '', size: 'large', offset: 'none' }
];

const FEATURED_PHOTOGRAPHERS: Photographer[] = [
  {
    id: 'flynn-kohut',
    name: 'Flynn Kohut',
    description: '',
    profileImage: '/images/profile/flynn-kohut.png',
    portfolios: [{ id: 'peace', title: 'Peace in a World of Hate', coverImage: '/images/flynn-kohut/01.jpeg', images: FLYNN_KOHUT_IMAGES }],
    isFeatured: true
  },
  {
    id: 'paxton-hope',
    name: 'Paxton Hope',
    description: '',
    profileImage: '/images/profile/paxton-hope.jpeg',
    portfolios: [{ id: 'archive', title: 'Paxton Hope', coverImage: '/images/paxton-hope/01.png', images: PAXTON_HOPE_IMAGES }],
    isFeatured: true
  },
  {
    id: 'aaleya-ganguly',
    name: 'Aaleya Ganguly',
    description: '',
    profileImage: '/images/profile/aaleya-ganguly.png',
    portfolios: [
      { id: 'cinematic', title: 'Aaleya Ganguly', coverImage: '/images/aaleya-ganguly/02.jpeg', images: AALEYA_GANGULY_IMAGES },
      { id: 'philadelphia-art-show', title: 'Philadelphia Art Show 2026', coverImage: '/images/philadelphia-art-show/01.jpeg', images: PHILADELPHIA_ART_SHOW_IMAGES }
    ],
    isFeatured: true
  },
  {
    id: 'nico-bowers',
    name: 'Nico Bowers',
    description: '',
    profileImage: '/images/profile/nico-bowers.jpeg',
    portfolios: [
      { id: 'jazz-cafe-night', title: 'Jazz Cafe Night', coverImage: '/images/jazz-cafe/01.jpeg', images: NICO_BOWERS_IMAGES },
      { id: 'travel', title: 'Travel', coverImage: '/images/travel/01.jpeg', images: TRAVEL_IMAGES }
    ],
    isFeatured: true
  },
  {
    id: 'gordon',
    name: 'Gordon Wiafe',
    description: '',
    profileImage: '/images/profile/gordon.png',
    portfolios: [{ id: 'campus', title: 'Gordon Wiafe', coverImage: '/images/gordon/01.jpeg', images: GORDON_IMAGES }],
    isFeatured: false
  }
];

const EVENTS: Event[] = [
  {
    id: 'jazz-cafe',
    title: 'Jazz Cafe',
    date: 'January 2026',
    coverImage: '/images/jazz-cafe/01.jpeg',
    images: NICO_BOWERS_IMAGES,
    photographerAttribution: 'taken by Nico Bowers'
  }
];

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Photographers', path: '/photographers' },
  { label: 'About', path: '/about' }
];

// --- Shared Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Fires `inView` true the first time the element crosses into the viewport, then stops watching.
const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-10 blur-sm'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setProgress(scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-[60]">
      <div className="h-full bg-black dark:bg-white transition-[width] duration-100 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
};

const RotatingSeal: React.FC<{ size?: number; className?: string; text?: string }> = ({ size = 108, className = '', text = 'EXETER PHOTOGRAPHY • EST. 2026 ' }) => {
  const pathId = `seal-${useId().replace(/[:]/g, '')}`;
  return (
    <div className={`relative shrink-0 text-black dark:text-white ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
        <defs>
          <path id={pathId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="5.4" letterSpacing="1.2" fill="currentColor" className="uppercase font-sans">
          <textPath href={`#${pathId}`} startOffset="0%">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[7px] h-[7px] rounded-full bg-black dark:bg-white" />
      </div>
    </div>
  );
};

// Fluid curved headline: bends upward along an arc ("rainbow" shape). Width/curve/font
// scale to the text length so short and long titles both sit comfortably on the arc,
// and the whole thing scales with its container (device-responsive by construction).
// A fixed "internal" font size shared by every ArcHeading — the curve, baseline and canvas
// measurement all use this one value, so no per-instance forcing/stretching is needed.
const ARC_FONT = 88;
const ARC_SIZE_CLAMP: Record<'md' | 'lg', string> = {
  md: 'clamp(3.25rem, 9.5vw, 6.5rem)',
  lg: 'clamp(3.75rem, 12.5vw, 9rem)',
};

// Curved headline: bends upward along an arc ("rainbow" shape). Every instance renders at the
// same real font-size (via the size prop) — text is never stretched or shrunk to fit a target
// width, so "Events" and "Photographers" (or any two titles) read as the same size and weight.
// Only the arc's own width grows or shrinks with the text, the way an actual heading would.
const ArcHeading: React.FC<{ children: string; className?: string; italic?: boolean; size?: 'md' | 'lg' }> = ({ children, className = '', italic = false, size = 'lg' }) => {
  const pathId = `arc-${useId().replace(/[:]/g, '')}`;
  const [width, setWidth] = useState(() => Math.max(460, children.length * 52 + 120));

  useEffect(() => {
    const measure = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.font = `${italic ? 'italic ' : ''}400 ${ARC_FONT}px "Bodoni Moda"`;
      const natural = ctx.measureText(children.toUpperCase()).width;
      if (natural > 0) setWidth(natural + 140);
    };
    measure();
    if ('fonts' in document) (document as any).fonts.ready.then(measure);
  }, [children, italic]);

  const height = 172;
  const curve = Math.max(24, Math.min(58, 62000 / width));
  const baseline = height - 40;
  const pathD = `M 20,${baseline} Q ${width / 2},${baseline - curve} ${width - 20},${baseline}`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`block relative left-1/2 ${className}`}
      style={{ width: `${width / ARC_FONT}em`, height: `${height / ARC_FONT}em`, fontSize: ARC_SIZE_CLAMP[size], transform: 'translateX(-50%)' }}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <path id={pathId} d={pathD} fill="none" />
      </defs>
      <text
        textAnchor="middle"
        fill="currentColor"
        className="uppercase"
        style={{ fontFamily: "'Bodoni Moda', serif", fontSize: ARC_FONT, fontStyle: italic ? 'italic' : 'normal' }}
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {children}
        </textPath>
      </text>
    </svg>
  );
};

// Straight full-bleed line: a short word and a long word stacked as two lines both reach edge to
// edge, but by scaling the actual font-size (measured with canvas) rather than stretching letter
// spacing — real point-size changes, like an actual poster, not artificially spread-out glyphs.
const FitText: React.FC<{ children: string; className?: string; italic?: boolean }> = ({ children, className = '', italic = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const containerWidth = el.clientWidth;
      if (!containerWidth) return;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const refSize = 300;
      ctx.font = `${italic ? 'italic ' : ''}400 ${refSize}px "Bodoni Moda"`;
      const textWidth = ctx.measureText(children.toUpperCase()).width;
      if (textWidth > 0) setFontSize((containerWidth / textWidth) * refSize * 0.99);
    };

    measure();
    const onFontsReady = () => measure();
    if ('fonts' in document) (document as any).fonts.ready.then(onFontsReady);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children, italic]);

  return (
    <div
      ref={ref}
      className={`w-full text-center whitespace-nowrap uppercase serif leading-[0.82] ${italic ? 'italic' : ''} ${className}`}
      style={{ fontSize: fontSize ? `${fontSize}px` : undefined, opacity: fontSize ? 1 : 0 }}
    >
      {children}
    </div>
  );
};

// A single rotating text ring, sized as a percentage of its (square) parent so a whole
// stack of these scales together responsively. Each instance spins at its own speed/direction.
const OrbitRing: React.FC<{ text: string; sizePct: number; duration: number; reverse?: boolean; fontSize?: number; opacity?: number }> = ({ text, sizePct, duration, reverse = false, fontSize = 4.2, opacity = 0.8 }) => {
  const pathId = `orbit-${useId().replace(/[:]/g, '')}`;
  const repeated = text.repeat(Math.max(2, Math.ceil(340 / text.length)));
  return (
    <svg
      viewBox="0 0 100 100"
      className="orbit-ring absolute top-1/2 left-1/2 text-black dark:text-white"
      style={{
        width: `${sizePct}%`,
        height: `${sizePct}%`,
        animation: `${reverse ? 'orbit-ccw-centered' : 'orbit-cw-centered'} ${duration}s linear infinite`,
        opacity,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      <defs>
        <path id={pathId} d="M 50,50 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.22" />
      {/* xmlSpace="preserve" keeps the padded separators from collapsing, which is what was making words run together.
          letterSpacing tracks fontSize (not a fixed value) so tracking reads consistently as rings grow outward. */}
      <text fontSize={fontSize} letterSpacing={fontSize * 0.22} fill="currentColor" className="uppercase font-sans" xmlSpace="preserve">
        <textPath href={`#${pathId}`} startOffset="0%">{repeated}</textPath>
      </text>
    </svg>
  );
};

// A deep stack of concentric rings, each its own speed/direction, wrapping a centered content
// block. Sized to run past the section's own edge so it reads as an endless pattern rather than
// a medallion that resolves cleanly — the section clips it, the rings don't stop on their own.
const OrbitRings: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sep = '    ✦    ';
  const photographerRing = FEATURED_PHOTOGRAPHERS.map(p => p.name.toUpperCase()).join(sep) + sep;
  const portfolioRing = FEATURED_PHOTOGRAPHERS.flatMap(p => p.portfolios.map(pf => pf.title.toUpperCase())).join(sep) + sep;
  const eventRing = EVENTS.map(e => e.title.toUpperCase()).join(sep) + sep + 'EXETER PHOTOGRAPHY' + sep;
  const locationRing = ['EXETER', 'NEW HAMPSHIRE', 'STUDENT ARCHIVE', 'EST. 2026'].join(sep) + sep;
  const registryRing = ['MISSION', 'CONTACT', 'INQUIRIES', 'CORRESPONDENCE', 'REGISTRY'].join(sep) + sep;
  const archiveRing = ['PORTFOLIO', 'ARCHIVE', 'VIEW', 'COLLECTIVE', 'REGISTRY'].join(sep) + sep;
  const taglineRing = 'A PLACE TO SHARE CAMPUS EVENTS THROUGH YOUR OWN LENS' + sep;

  // Rings generated from a formula rather than hand-picked sizes. The gap between consecutive
  // rings grows gradually outward — a flat gap would get visually tighter as the font grows,
  // since bigger type needs more radial room even though the percentage step is the same.
  // Kept to a modest count: each ring is an animated, blurred-adjacent SVG layer, and piling on
  // too many tanks frame rate (and reads as flashing/stutter) on lower-powered laptops.
  const textCycle = [photographerRing, portfolioRing, eventRing, locationRing, registryRing, archiveRing, taglineRing];
  const ringCount = 8;
  let cursor = 62;
  const rings = Array.from({ length: ringCount }, (_, i) => {
    const sizePct = cursor;
    cursor += 15 + i * 2.2;
    return {
      text: textCycle[i % textCycle.length],
      sizePct,
      duration: 30 + i * 14,
      reverse: i % 2 === 1,
      fontSize: 3.6 + i * 0.08,
      opacity: Math.max(0.12, 0.9 - i * 0.11),
    };
  });

  return (
    <div className="relative mx-auto" style={{ width: 'clamp(400px, 58vw, 1600px)', aspectRatio: '1 / 1' }}>
      {rings.map((r, i) => <OrbitRing key={i} {...r} />)}
      <div className="absolute inset-0 m-auto rounded-full bg-[#fcfcfc] dark:bg-black blur-xl" style={{ width: '44%', height: '44%' }} />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        {children}
      </div>
    </div>
  );
};

const DarkModeToggle: React.FC<{ isDark: boolean; toggle: () => void }> = ({ isDark, toggle }) => (
  <button 
    onClick={toggle}
    className="p-2 bg-transparent transition-transform hover:scale-110 active:scale-95 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white rounded-full"
    aria-label="Toggle Dark Mode"
  >
    {isDark ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )}
  </button>
);

const Layout: React.FC<{ children: React.ReactNode; isDark: boolean; toggleDark: () => void }> = ({ children, isDark, toggleDark }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${isDark ? 'dark bg-black' : 'bg-[#fcfcfc]'}`}>
      <ScrollProgress />
      <header className="py-4 px-4 md:px-8 xl:px-12 sticky top-0 bg-inherit/95 backdrop-blur-md z-50 border-b border-gray-100/50 dark:border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 order-2 md:order-1">
            {!isHome && (
              <Link to="/" className="group text-center md:text-left">
                <h1 className="text-xl md:text-2xl serif italic font-normal tracking-tight transition-all group-hover:opacity-60 leading-tight text-black dark:text-white">
                  Exeter Photography
                </h1>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500 mt-1 font-medium">
                  (hosted by nico bowers)
                </p>
              </Link>
            )}
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-10 justify-center order-1 md:order-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] uppercase tracking-[0.4em] transition-all relative pb-1 whitespace-nowrap ${
                  location.pathname === item.path
                  ? 'text-black dark:text-white font-semibold'
                  : 'text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black dark:bg-white"></span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-center md:justify-end order-3">
             <DarkModeToggle isDark={isDark} toggle={toggleDark} />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col py-2">
        <div className="max-w-screen-2xl mx-auto w-full flex-grow flex flex-col">
          {children}
        </div>
      </main>

      <footer className="py-12 px-4 md:px-8 border-t border-gray-50 dark:border-white/5 text-center bg-inherit">
        <div className="max-w-screen-sm mx-auto space-y-4">
          <div className="flex justify-center">
            <RotatingSeal size={52} className="opacity-70" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600 font-medium">Exeter • NH</p>
          </div>
          <div className="flex justify-center gap-6 items-center opacity-40 dark:opacity-20">
             <div className="h-[1px] w-8 bg-gray-400 dark:bg-gray-600"></div>
             <p className="text-[9px] uppercase tracking-[0.2em] text-black dark:text-gray-400 font-medium">© The Exeter Collection</p>
             <div className="h-[1px] w-8 bg-gray-400 dark:bg-gray-600"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Page Components ---

const SpecimenTile: React.FC<{ to: string; image: string; name: string; index: number; label?: string }> = ({ to, image, name, index, label = 'Portfolio' }) => (
  <Reveal delay={(index - 1) % 4 * 90} className="w-full">
  <Link to={to} className="group w-full flex flex-col items-center transition-transform duration-500 ease-out hover:-translate-y-1">
    <div className="relative w-full aspect-[4/5] overflow-hidden bg-black mb-0 shadow-sm group-hover:shadow-2xl transition-all duration-700">
      <img
        referrerPolicy="no-referrer"
        src={image}
        alt={name}
        className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <span className="absolute top-3 right-3 text-white/50 serif italic text-sm">{String(index).padStart(2, '0')}</span>
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 flex items-end justify-between gap-2">
        <span className="serif italic text-white text-lg md:text-xl leading-none">{name}</span>
        <span className="text-white/50 text-[8px] uppercase tracking-[0.25em] whitespace-nowrap mb-[3px]">{label}</span>
      </div>
    </div>
  </Link>
  </Reveal>
);

const Home: React.FC = () => (
  <section className="text-center reveal w-full flex-grow flex flex-col items-center">
    <div className="flex-grow flex flex-col items-center justify-center w-full px-4 text-center pt-6 pb-16">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="block text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-600">Est. Exeter, NH</span>
      </div>
      <div className="mb-4 w-full flex justify-center">
        <RotatingSeal size={92} className="hidden md:block" />
      </div>
      <h1 className="mb-8 w-full text-black dark:text-white">
        <FitText>Exeter</FitText>
        <FitText italic className="-mt-[1%]">Photography</FitText>
      </h1>

      <div className="mb-6 space-y-6 max-w-xl mx-auto text-center flex flex-col items-center">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-black/60 dark:text-gray-500 font-light px-4">
            A place to share campus events through your own lens
          </p>
          <div className="pt-2">
            <Link to="/contact" className="inline-block border border-black dark:border-white/10 px-10 py-3 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
              Submit Here
            </Link>
          </div>
      </div>
    </div>

    <div className="w-full pb-16 px-4 md:px-8 border-t border-black/10 dark:border-white/10">
      <Reveal className="mb-10 pt-10 max-w-md mx-auto flex flex-col items-center justify-center">
          <h2 className="text-[9px] font-medium uppercase tracking-[0.6em] text-black dark:text-gray-600 text-center">This month's photographers</h2>
          <div className="h-[1px] w-12 bg-black/10 dark:bg-white/10 mx-auto mt-2"></div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 justify-items-center max-w-7xl mx-auto w-full">
        {FEATURED_PHOTOGRAPHERS.filter(p => p.isFeatured).map((photographer, i) => (
          <SpecimenTile
            key={photographer.id}
            to={`/photographer/${photographer.id}`}
            image={photographer.profileImage}
            name={photographer.name}
            index={i + 1}
          />
        ))}
      </div>
    </div>
  </section>
);

const EventsPage: React.FC = () => (
  <section className="reveal w-full px-4 md:px-8 xl:px-12 pb-24 flex flex-col items-center">
    <Reveal className="max-w-4xl mx-auto mb-16 mt-12 text-center">
      <h2 className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-4">The Archive</h2>
      <ArcHeading size="md" className="text-black dark:text-white mb-2 -mt-2">Events</ArcHeading>
      <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10 mx-auto"></div>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full">
      {EVENTS.map((event, i) => (
        <Reveal key={event.id} delay={i * 100} className="w-full">
        <Link
          to={`/event/${event.id}`}
          className="group w-full flex flex-col transition-transform duration-500 ease-out hover:-translate-y-1"
        >
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-black mb-0 shadow-sm group-hover:shadow-2xl transition-all duration-700">
            <img
              referrerPolicy="no-referrer"
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-6 space-y-1">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 block font-medium">{event.date}</span>
              <h3 className="text-3xl md:text-5xl italic text-white group-hover:opacity-70 transition-opacity leading-tight">{event.title}</h3>
            </div>
          </div>
        </Link>
        </Reveal>
      ))}
    </div>
  </section>
);

const PhotographerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);

  if (!photographer) {
    return <Navigate to="/" />;
  }

  return (
    <div className="reveal w-full px-4 md:px-8 xl:px-12 pb-24">
      <section className="max-w-5xl mx-auto mb-16 mt-12 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-4">Registry // Photographer</span>
            <ArcHeading className="text-black dark:text-white mb-2">{photographer.name}</ArcHeading>
        </div>
        <div className="h-[1px] w-16 bg-black/10 dark:bg-white/10 mx-auto mt-12"></div>
      </section>

      <section className="max-w-6xl mx-auto mb-24 px-4">
        <Reveal className="mb-12 text-center md:text-left">
           <h3 className="text-[10px] uppercase tracking-[0.6em] text-black dark:text-gray-600 font-bold mb-4">Portfolios</h3>
           <div className="h-[1px] w-12 bg-black/20 dark:bg-white/10 mx-auto md:mx-0"></div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {photographer.portfolios.map((portfolio, i) => (
             <Reveal key={portfolio.id} delay={i * 100}>
             <Link to={`/photographer/${id}/portfolio/${portfolio.id}`} className="group block transition-transform duration-500 ease-out hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden bg-black mb-0 shadow-sm group-hover:shadow-xl transition-all duration-700">
                   <img
                     referrerPolicy="no-referrer"
                     src={portfolio.coverImage}
                     alt={portfolio.title}
                     className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
                   />
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                   <span className="absolute top-3 right-3 text-white/50 serif italic text-sm">{String(i + 1).padStart(2, '0')}</span>
                   <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-6 flex items-end justify-between gap-2">
                     <h4 className="text-2xl md:text-3xl italic text-white leading-none">{portfolio.title}</h4>
                     <span className="text-[8px] uppercase tracking-[0.25em] text-white/50 whitespace-nowrap mb-[3px]">View</span>
                   </div>
                </div>
             </Link>
             </Reveal>
           ))}
        </div>
      </section>

      <Reveal className="max-w-3xl mx-auto text-center py-20 border-t border-gray-100 dark:border-white/5 mt-24">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl serif italic mb-6 text-black dark:text-white">Inquiries & Correspondence</h3>
            <div className="pt-2">
                <Link to="/contact" className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-1000 font-medium text-black dark:text-white">
                    Contact Nico Bowers
                </Link>
            </div>
          </div>
      </Reveal>
    </div>
  );
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === id);

  if (!event) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="reveal w-full px-4 md:px-8 xl:px-12 pb-24">
      <section className="max-w-5xl mx-auto mb-24 mt-8 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-3">Event Archive // {event.date}</span>
            <ArcHeading className="text-black dark:text-white" italic>{event.title}</ArcHeading>
            {event.photographerAttribution && (
              <p className="text-[10px] uppercase tracking-[0.4em] text-black dark:text-gray-600 mt-4">{event.photographerAttribution}</p>
            )}
        </div>
        <div className="h-[1px] w-16 bg-black/10 dark:bg-white/10 mx-auto mt-8"></div>
      </section>

      <section className="space-y-32 md:space-y-48 mb-24 max-w-6xl mx-auto px-4">
        {event.images.map((image, index) => (
          <Reveal key={index} className="relative flex flex-col items-center w-full mx-auto">
            <div className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl shadow-black/5 dark:shadow-white/5 w-fit mx-auto">
              <img
                referrerPolicy="no-referrer"
                src={image.url}
                loading="lazy"
                className="w-auto h-auto max-w-full max-h-[85vh] block brightness-[1.05] contrast-[1.02] transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.04]"
                alt={`${event.title} — photo ${index + 1}`}
              />
            </div>
          </Reveal>
        ))}
      </section>

      <div className="max-w-xl mx-auto text-center py-20 border-t border-gray-100 dark:border-white/5">
          <Link to="/events" className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
              Back to Events
          </Link>
      </div>
    </div>
  );
};

const PortfolioDetail: React.FC = () => {
  const { id, portfolioId } = useParams<{ id: string, portfolioId: string }>();
  const photographer = FEATURED_PHOTOGRAPHERS.find(p => p.id === id);
  const portfolio = photographer?.portfolios.find(p => p.id === portfolioId);

  if (!photographer || !portfolio) {
    return <Navigate to={`/photographer/${id}`} />;
  }

  return (
    <div className="reveal w-full px-4 md:px-8 xl:px-12 pb-24">
      <section className="max-w-5xl mx-auto mb-24 mt-8 text-center">
        <div className="mb-4">
            <span className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-3">{photographer.name} // Archive</span>
            <ArcHeading className="text-black dark:text-white" italic>{portfolio.title}</ArcHeading>
        </div>
        <div className="h-[1px] w-16 bg-black/10 dark:bg-white/10 mx-auto mt-8"></div>
      </section>

      {/* Editorial Grid System */}
      <section className="space-y-32 md:space-y-48 mb-24 max-w-6xl mx-auto px-4">
        {portfolio.images.map((image, index) => (
          <Reveal key={index} className="relative flex flex-col items-center w-full mx-auto">
            <div className="group relative overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl shadow-black/5 dark:shadow-white/5 w-fit mx-auto">
              <img
                referrerPolicy="no-referrer"
                src={image.url}
                loading="lazy"
                className="w-auto h-auto max-w-full max-h-[85vh] block brightness-[1.05] contrast-[1.02] transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.04]"
                alt={`${portfolio.title} — photo ${index + 1}`}
              />
            </div>
          </Reveal>
        ))}
      </section>

      <div className="max-w-xl mx-auto text-center py-20 border-t border-gray-100 dark:border-white/5">
          <Link to={`/photographer/${id}`} className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
              Back to {photographer.name.split(' ')[0]}'s Page
          </Link>
      </div>
    </div>
  );
};

const PhotographersPage: React.FC = () => (
  <section className="reveal w-full px-4 md:px-8 xl:px-12 pb-24 flex flex-col items-center">
    <div className="max-w-4xl mx-auto mb-16 mt-12 text-center">
      <h2 className="text-[9px] uppercase tracking-[0.8em] text-black dark:text-gray-700 block mb-4">Registry</h2>
      <ArcHeading size="md" className="text-black dark:text-white mb-2 -mt-2">Photographers</ArcHeading>
      <div className="h-[1px] w-24 bg-black/10 dark:bg-white/10 mx-auto mb-12"></div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 max-w-7xl mx-auto w-full">
      {FEATURED_PHOTOGRAPHERS.map((photographer, i) => (
        <SpecimenTile
          key={photographer.id}
          to={`/photographer/${photographer.id}`}
          image={photographer.profileImage}
          name={photographer.name}
          index={i + 1}
        />
      ))}
    </div>

    <Reveal className="mt-32 max-w-3xl mx-auto text-center border-t border-gray-100 dark:border-white/5 pt-16">
      <h4 className="text-xl serif italic mb-8 text-black dark:text-white">Join Us</h4>
      <Link to="/contact" className="inline-block border border-black dark:border-white/10 px-12 py-4 text-[9px] uppercase tracking-[0.4em] text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700">
        Submit Archive
      </Link>
    </Reveal>
  </section>
);

const AboutContact: React.FC = () => (
  <section className="reveal w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-4 py-14 md:py-0 flex-grow flex flex-col items-center justify-center relative overflow-hidden min-h-[85vh] md:min-h-[calc(100vh-96px)]">
    <OrbitRings>
      <div className="text-center flex flex-col items-center gap-1.5 sm:gap-3 max-w-[160px] sm:max-w-[260px]">
        <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.4em] text-black dark:text-gray-600">Mission &amp; Contact</span>
        <h3 className="text-lg sm:text-3xl serif italic text-black dark:text-white leading-tight">Exeter Photography</h3>
        <p className="text-[9px] sm:text-xs leading-snug sm:leading-relaxed italic serif text-black dark:text-gray-400">
          An archive for students to share the world through their own lens. Based in Exeter, New Hampshire.
        </p>
        <div className="pt-2 sm:pt-3 mt-1 space-y-1.5 sm:space-y-2 border-t border-black/10 dark:border-white/10 w-full">
          <a href="mailto:nbowers@exeter.edu" className="block text-[9px] sm:text-xs text-black dark:text-white hover:opacity-50 transition-opacity tracking-wide not-italic truncate">
            nbowers@exeter.edu
          </a>
          <a
            href="https://www.instagram.com/nicobowers2010/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[9px] sm:text-xs text-black dark:text-white hover:opacity-50 transition-opacity tracking-wide not-italic"
          >
            @nicobowers2010
          </a>
        </div>
      </div>
    </OrbitRings>
  </section>
);

// --- App Root ---

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <HashRouter>
      <ScrollToTop />
      <Layout isDark={isDark} toggleDark={() => setIsDark(!isDark)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/photographers" element={<PhotographersPage />} />
          <Route path="/about" element={<AboutContact />} />
          <Route path="/contact" element={<Navigate to="/about" replace />} />
          <Route path="/photographer/:id" element={<PhotographerDetail />} />
          <Route path="/photographer/:id/portfolio/:portfolioId" element={<PortfolioDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}