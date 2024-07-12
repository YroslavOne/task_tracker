import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateInputProps } from "./DateInput.props";
import style from "./DateInput.module.css";
import { Dayjs } from "dayjs";

function DateInput({
  setValue,
  selectedDate,
  setSelectedDate,
}: DateInputProps) {
  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      setValue("date", date.toISOString()); // Assuming you need the date as ISO string
    }
  };

  return (
    <div className={style["date"]}>
      <p>Сomplete</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="MM/DD/YYYY"
          className={style["date-input"]}
          value={selectedDate}
          onChange={handleDateChange}
          disablePast
          slotProps={{
            textField: { size: "small" },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DateInput;
