export interface DatePeriodProps {
    searchDate: [string, string] | null;
    setsearchDate: (date: [string, string]) => void;
  }