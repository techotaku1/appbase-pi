import * as z from 'zod';
import type { CargoReport } from './CargoReport';

const STORAGE_KEY = 'cargo-reports';

const storedReportsSchema = z.array(
  z.object({
    id: z.string(),
    plate: z.string(),
    date: z.string(),
    loadNumber: z.string(),
    company: z.string(),
    driver: z.string(),
    note: z.string(),
    freightValue: z.number(),
  }),
);

/**
 * Reads the stored cargo reports from localStorage.
 * @returns The parsed reports, or an empty array when unavailable or invalid.
 */
export const loadCargoReports = (): CargoReport[] => {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  const parsed = storedReportsSchema.safeParse(JSON.parse(raw));

  return parsed.success ? parsed.data : [];
};

/**
 * Persists the given cargo reports to localStorage.
 * @param reports - The reports to persist.
 */
export const saveCargoReports = (reports: CargoReport[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
};
