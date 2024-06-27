import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DateInputProps } from './DateInput.props';
import style from './DateInput.module.css';
import dayjs, { Dayjs } from 'dayjs';

function DateInput({ setValue, selectedDate, setSelectedDate }: DateInputProps) {
  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      setValue('date', date.toISOString()); // Assuming you need the date as ISO string
    }
  };

  return (
    <div className={style["date"]}>
      <p>Date</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className={style["date-input"]}
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{
            textField: { size: 'small' },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DateInput;
