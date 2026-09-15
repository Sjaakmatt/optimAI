// design-sync shim for `next/image`: a plain <img>. `fill` becomes the same
// absolute-positioned box Next renders; root-relative sources (the app's
// public/ folder) are served from the live site so cards render offline from
// the repo without shipping the image assets.
import { forwardRef, type CSSProperties, type ImgHTMLAttributes } from 'react';

export const ASSET_BASE = 'https://factumai.nl';

type StaticImport = { src: string; width?: number; height?: number } | { default: { src: string; width?: number; height?: number } };

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  src: string | StaticImport;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number | string;
  placeholder?: 'blur' | 'empty' | string;
  blurDataURL?: string;
  unoptimized?: boolean;
  loader?: unknown;
  onLoadingComplete?: unknown;
}

function resolveSrc(src: ImageProps['src']): string {
  const raw = typeof src === 'string' ? src : 'default' in src ? src.default.src : src.src;
  return raw.startsWith('/') && !raw.startsWith('//') ? ASSET_BASE + raw : raw;
}

const FILL: CSSProperties = {
  position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'transparent',
};

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, width, height, fill, sizes, priority, quality, placeholder, blurDataURL, unoptimized, loader, onLoadingComplete, style, ...rest },
  ref,
) {
  return (
    <img
      ref={ref}
      src={resolveSrc(src)}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={fill ? { ...FILL, ...style } : style}
      {...rest}
    />
  );
});

export default Image;

// Plain <img> elements in the source (Logostrook's client logos) also use
// root-relative paths from public/. Outside the app those 404; retry them once
// from the live site when they fail. Capture-phase listener: error events on
// <img> don't bubble.
if (typeof document !== 'undefined') {
  document.addEventListener(
    'error',
    (e) => {
      const el = e.target as HTMLImageElement | null;
      if (!el || el.tagName !== 'IMG' || el.dataset.assetRetried) return;
      const src = el.getAttribute('src') ?? '';
      if (!src.startsWith('/') || src.startsWith('//')) return;
      el.dataset.assetRetried = '1';
      el.src = ASSET_BASE + src;
    },
    true,
  );
}
