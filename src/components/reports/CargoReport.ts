export type CargoReport = {
  id: string;
  plate: string;
  date: string; // ISO yyyy-mm-dd
  loadNumber: string;
  company: string;
  driver: string;
  note: string;
  freightValue: number;
};
