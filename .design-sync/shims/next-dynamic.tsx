// design-sync shim for `next/dynamic`: React.lazy behind a Suspense boundary.
// `ssr: false` is meaningless here (everything is client-rendered).
import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

type Loader<P> = () => Promise<ComponentType<P> | { default: ComponentType<P> }>;
interface Options { ssr?: boolean; loading?: () => ReactNode }

export default function dynamic<P extends object>(loader: Loader<P>, opts: Options = {}): ComponentType<P> {
  const Lazy = lazy(async () => {
    const mod = await loader();
    return 'default' in mod ? mod : { default: mod };
  });
  const fallback = opts.loading ? opts.loading() : null;
  return function DynamicComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <Lazy {...(props as P)} />
      </Suspense>
    );
  };
}
