import dayjs, { Dayjs } from "dayjs";

export interface DateInputProps{
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (value: Dayjs | null) => void;
}