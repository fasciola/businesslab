import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Final asset path, e.g. /images/hero-main.jpg. Used as soon as the file exists. */
  src: string;
  /** Shown while the final asset is missing (placeholder or old photo). */
  fallback?: string;
}

/** Image that falls back to a placeholder until the real generated asset is dropped into /public. */
export default function Img({ src, fallback, alt = '', ...rest }: ImgProps) {
  const [failed, setFailed] = useState(false);
  const current = failed && fallback ? fallback : src;
  return <img {...rest} src={current} alt={alt} onError={() => { if (!failed && fallback) setFailed(true); }} />;
}

export const ph = (name: string) => `/images/placeholders/${name}.svg`;
