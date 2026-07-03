'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <select
      defaultValue={locale}
      onChange={(event) => {
        router.push(pathname, { locale: event.target.value });
        router.refresh();
      }}
      className="rounded border border-gray-300 px-2 py-1 text-sm font-medium text-gray-700"
      aria-label="lang-switcher"
    >
      {routing.locales.map((option) => (
        <option key={option} value={option}>
          {option.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
