import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

function DatePeriod() {
	const [value, setValue] = React.useState<DateRange<Dayjs>>([
    null
  ]);

	console.log(value)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar']}>
        <DateRangeCalendar 
				value={value}
            onChange={(newValue) => setValue(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
	export default DatePeriod
