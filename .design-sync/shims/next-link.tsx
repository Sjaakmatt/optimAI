// design-sync shim for `next/link`: a plain anchor. Navigation props that only
// mean something inside a Next.js app are accepted and dropped.
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';

type Href = string | { pathname?: string; query?: Record<string, string>; hash?: string };

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: Href;
  prefetch?: boolean | null;
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
  locale?: string | false;
  children?: ReactNode;
}

function toHref(h: Href): string {
  if (typeof h === 'string') return h;
  const q = h.query ? '?' + new URLSearchParams(h.query).toString() : '';
  return (h.pathname ?? '') + q + (h.hash ?? '');
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch, scroll, replace, shallow, passHref, legacyBehavior, locale, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} href={toHref(href)} {...rest}>
      {children}
    </a>
  );
});

export default Link;
