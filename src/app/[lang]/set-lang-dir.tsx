
"use client";

import { useEffect } from 'react';
import type { Locale } from '../../../middleware'; // Adjust path as necessary

interface SetLangDirProps {
  lang: Locale;
  dir: 'ltr' | 'rtl';
}

export function SetLangDir({ lang, dir }: SetLangDirProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  return null; // This component does not render anything visible
}
