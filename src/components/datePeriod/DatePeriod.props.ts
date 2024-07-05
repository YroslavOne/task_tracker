export interface DatePeriodProps {
    searchDate: [string | null, string | null] | null;
    setsearchDate: (date: [string | null, string | null]) => void;
  }