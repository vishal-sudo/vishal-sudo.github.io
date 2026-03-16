'use client';

import { ReactNode } from 'react';
import { ThemeProvider, useTheme } from '@/lib/ThemeContext';

function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
