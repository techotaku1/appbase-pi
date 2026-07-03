'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type { CargoReport } from './CargoReport';
import { calculateCargoReportsBalance, filterReportsByMonth } from './cargoReportsBalance';
import { loadCargoReports, saveCargoReports } from './cargoReportsStorage';
import { MonthlyBalance } from './MonthlyBalance';
import { ReportForm } from './ReportForm';
import { ReportsTable } from './ReportsTable';

const currentMonth = () => new Date().toISOString().slice(0, 7);

const sortByDateAscending = (reports: CargoReport[]) =>
  [...reports].toSorted((a, b) => a.date.localeCompare(b.date));

export const ReportsBoard = () => {
  const t = useTranslations('ReportsBoard');
  const [reports, setReports] = useState<CargoReport[]>([]);
  const [month, setMonth] = useState(currentMonth());
  const [showAllMonths, setShowAllMonths] = useState(false);

  useEffect(() => {
    setReports(loadCargoReports());
  }, []);

  const handleAdd = (report: CargoReport) => {
    setReports((previous) => {
      const next = [...previous, report];
      saveCargoReports(next);
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setReports((previous) => {
      const next = previous.filter((report) => report.id !== id);
      saveCargoReports(next);
      return next;
    });
  };

  const activeMonth = showAllMonths ? undefined : month;
  const visibleReports = sortByDateAscending(filterReportsByMonth(reports, activeMonth));
  const monthBalance = calculateCargoReportsBalance(visibleReports);
  const overallTotal = calculateCargoReportsBalance(reports).totalFreightValue;

  return (
    <div className="flex flex-col gap-6">
      <ReportForm onAdd={handleAdd} />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <label htmlFor="month-filter" className="text-sm font-medium text-gray-700">
          {t('month_filter_label')}
        </label>
        <input
          id="month-filter"
          type="month"
          aria-label={t('month_filter_label')}
          className="rounded-lg border border-gray-300 px-3 py-2"
          value={month}
          disabled={showAllMonths}
          onChange={(event) => {
            setMonth(event.target.value);
          }}
        />
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            aria-label={t('month_filter_all')}
            checked={showAllMonths}
            onChange={(event) => {
              setShowAllMonths(event.target.checked);
            }}
          />
          {t('month_filter_all')}
        </label>
      </div>

      <MonthlyBalance monthBalance={monthBalance} overallTotal={overallTotal} />

      <ReportsTable reports={visibleReports} onDelete={handleDelete} />
    </div>
  );
};
