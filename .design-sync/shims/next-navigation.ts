// design-sync shim for `next/navigation`: no app router exists in a preview
// or a design, so the hooks answer from window.location and navigation is a
// no-op.
export function usePathname(): string {
  return typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
}
export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
}
export function useParams<T = Record<string, string | string[]>>(): T {
  return {} as T;
}
export function useRouter() {
  return {
    push(_href: string) {},
    replace(_href: string) {},
    back() {},
    forward() {},
    refresh() {},
    prefetch(_href: string) {},
  };
}
export function useSelectedLayoutSegment(): string | null { return null; }
export function useSelectedLayoutSegments(): string[] { return []; }
export function redirect(_url: string): never { throw new Error('redirect() is not available outside Next.js'); }
export function notFound(): never { throw new Error('notFound() is not available outside Next.js'); }
