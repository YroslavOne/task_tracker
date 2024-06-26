import makeStyles from "@mui/material/styles/makeStyles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateInputProps } from "./DateInput.props";
import style from "./DateInput.module.css";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function DateInput({
  setValue,
  selectedDate,
  setSelectedDate,
}: DateInputProps) {
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setValue("date", date);
  };


  return (

    <div className={style["date"]}>
      <p>Date</p>
			 <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        className={style["date-input"]}
          slotProps={{ textField: { size: "small" } }}
          style={{ padding: "10px" }}
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
					
        />
				</LocalizationProvider>
    </div>
  );
}
export default DateInput;
