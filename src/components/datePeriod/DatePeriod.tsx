import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import style from "./DatePeriod.module.css";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { DatePeriodProps } from "./DatePeriod.props";


function DatePeriod({ searchDate, setsearchDate }: DatePeriodProps) {
  const [value, setValue] = useState<DateRange<Dayjs>>([
    searchDate ? dayjs(searchDate[0]) : null,
    searchDate ? dayjs(searchDate[1]) : null,
  ]);

  useEffect(() => {
    const dateCorrectValue: [string | null, string | null] = [null, null];
    value.forEach((v, index) => {
      const date = v
        ? `${String(v.month() + 1).padStart(2, "0")}.${String(v.date()).padStart(2, "0")}.${v.year()}`
        : searchDate?.[index] ?? "";
      dateCorrectValue[index] = date;
    });
    setsearchDate(dateCorrectValue);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangeCalendar"]}>
        <DateRangeCalendar
          className={style["date"]}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePeriod;
