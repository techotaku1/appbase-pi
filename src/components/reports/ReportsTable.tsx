'use client';

import { useTranslations } from 'next-intl';
import type { CargoReport } from './CargoReport';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export const ReportsTable = (props: { reports: CargoReport[]; onDelete: (id: string) => void }) => {
  const t = useTranslations('ReportsBoard');

  if (props.reports.length === 0) {
    return <p className="text-gray-700">{t('empty_state')}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-300 text-sm text-gray-700">
            <th className="py-2 pr-4">{t('column_plate')}</th>
            <th className="py-2 pr-4">{t('column_date')}</th>
            <th className="py-2 pr-4">{t('column_load_number')}</th>
            <th className="py-2 pr-4">{t('column_company')}</th>
            <th className="py-2 pr-4">{t('column_driver')}</th>
            <th className="py-2 pr-4">{t('column_note')}</th>
            <th className="py-2 pr-4">{t('column_freight_value')}</th>
            <th className="py-2 pr-4" aria-label={t('column_actions')} />
          </tr>
        </thead>
        <tbody>
          {props.reports.map((report) => (
            <tr key={report.id} className="border-b border-gray-200 text-gray-900">
              <td className="py-2 pr-4">{report.plate}</td>
              <td className="py-2 pr-4">{report.date}</td>
              <td className="py-2 pr-4">{report.loadNumber}</td>
              <td className="py-2 pr-4">{report.company}</td>
              <td className="py-2 pr-4">{report.driver}</td>
              <td className="py-2 pr-4">{report.note}</td>
              <td className="py-2 pr-4">{currencyFormatter.format(report.freightValue)}</td>
              <td className="py-2 pr-4">
                <button
                  type="button"
                  onClick={() => {
                    props.onDelete(report.id);
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  {t('delete_report')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
