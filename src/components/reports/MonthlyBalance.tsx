'use client';

import { useTranslations } from 'next-intl';
import type { CargoReportsBalance } from './cargoReportsBalance';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export const MonthlyBalance = (props: {
  monthBalance: CargoReportsBalance;
  overallTotal: number;
}) => {
  const t = useTranslations('ReportsBoard');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-gray-300 p-4">
        <p className="text-sm text-gray-700">{t('balance_month_total')}</p>
        <p className="text-2xl font-bold text-gray-900">
          {currencyFormatter.format(props.monthBalance.totalFreightValue)}
        </p>
      </div>

      <div className="rounded-lg border border-gray-300 p-4">
        <p className="text-sm text-gray-700">{t('balance_month_count')}</p>
        <p className="text-2xl font-bold text-gray-900">{props.monthBalance.loadCount}</p>
      </div>

      <div className="rounded-lg border border-gray-300 p-4">
        <p className="text-sm text-gray-700">{t('balance_overall_total')}</p>
        <p className="text-2xl font-bold text-gray-900">
          {currencyFormatter.format(props.overallTotal)}
        </p>
      </div>

      <div className="rounded-lg border border-gray-300 p-4">
        <p className="text-sm text-gray-700">{t('balance_per_plate')}</p>
        <ul className="mt-2 flex flex-col gap-1">
          {props.monthBalance.plateSubtotals.map((subtotal) => (
            <li key={subtotal.plate} className="flex justify-between text-sm text-gray-900">
              <span>{subtotal.plate}</span>
              <span>{currencyFormatter.format(subtotal.total)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
