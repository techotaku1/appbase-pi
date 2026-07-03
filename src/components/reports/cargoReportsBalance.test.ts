import { describe, expect, it } from 'vitest';
import type { CargoReport } from './CargoReport';
import { calculateCargoReportsBalance, filterReportsByMonth } from './cargoReportsBalance';

const reports: CargoReport[] = [
  {
    id: '1',
    plate: 'NQL417',
    date: '2026-06-05',
    loadNumber: 'L-001',
    company: 'Acme',
    driver: 'Carlos',
    note: '',
    freightValue: 1_000_000,
  },
  {
    id: '2',
    plate: 'ETL242',
    date: '2026-06-10',
    loadNumber: 'L-002',
    company: 'Acme',
    driver: 'Maria',
    note: '',
    freightValue: 500_000,
  },
  {
    id: '3',
    plate: 'NQL417',
    date: '2026-07-01',
    loadNumber: 'L-003',
    company: 'Beta',
    driver: 'Carlos',
    note: '',
    freightValue: 750_000,
  },
];

describe('filterReportsByMonth', () => {
  it('keeps only reports within the given month', () => {
    const result = filterReportsByMonth(reports, '2026-06');

    expect(result).toHaveLength(2);
    expect(result.map((report) => report.id)).toEqual(['1', '2']);
  });

  it('returns all reports when month is undefined', () => {
    const result = filterReportsByMonth(reports);

    expect(result).toHaveLength(3);
  });
});

describe('calculateCargoReportsBalance', () => {
  it('sums the total freight value for the month', () => {
    const monthReports = filterReportsByMonth(reports, '2026-06');
    const balance = calculateCargoReportsBalance(monthReports);

    expect(balance.totalFreightValue).toBe(1_500_000);
  });

  it('counts the loads for the month', () => {
    const monthReports = filterReportsByMonth(reports, '2026-06');
    const balance = calculateCargoReportsBalance(monthReports);

    expect(balance.loadCount).toBe(2);
  });

  it('groups per-plate subtotals for the month', () => {
    const monthReports = filterReportsByMonth(reports, '2026-06');
    const balance = calculateCargoReportsBalance(monthReports);

    expect(balance.plateSubtotals).toEqual([
      { plate: 'NQL417', total: 1_000_000, count: 1 },
      { plate: 'ETL242', total: 500_000, count: 1 },
    ]);
  });

  it('computes the all-time total across every month', () => {
    const balance = calculateCargoReportsBalance(reports);

    expect(balance.totalFreightValue).toBe(2_250_000);
    expect(balance.loadCount).toBe(3);
  });
});
