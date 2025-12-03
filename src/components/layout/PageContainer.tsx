import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
}

export function PageContainer({
  children,
  className,
  withPadding = true,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'min-h-screen pb-24 safe-area-top',
        withPadding && 'px-4 pt-6',
        className
      )}
    >
      <div className="max-w-lg mx-auto">{children}</div>
    </main>
  );
}
