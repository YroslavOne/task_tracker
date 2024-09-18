import dayjs, { Dayjs } from "dayjs";
import { UseFormSetValue } from "react-hook-form";

export interface DateInputProps{
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (value: Dayjs | null) => void;
  setValue: UseFormSetValue<any>;

}