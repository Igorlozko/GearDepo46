import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useValue } from '../../../context/ContextProvider';
import { Stack } from '@mui/material';

const AddDate = ({ gearId }) => {
  const { state: { dateRange }, updateDateRange, dispatch } = useValue();
  const [selectionRange, setSelectionRange] = useState({
    startDate: dateRange[0],
    endDate: dateRange[1],
    key: 'selection',
  });
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    if (gearId) {
      fetchReservedDates(gearId);
    }
  }, [gearId]);

  const fetchReservedDates = async (gearId) => {
    try {
      console.log('Fetching reserved dates for gear:', gearId);
      const response = await fetch(`http://localhost:5000/reservation/reserved-dates?gearId=${gearId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reserved dates');
      }
      const data = await response.json();
      console.log('Fetched reserved dates:', data);
      
      setReservedDates(data); // Set reserved dates directly
      
    } catch (error) {
      console.error('Error fetching reserved dates:', error);
    }
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    
    // Check if any reserved date overlaps with the selected range
    const isDateOverlapping = reservedDates.some(reservation => {
      const start = new Date(reservation.startDate).getTime();
      const end = new Date(reservation.endDate).getTime();
      const selectedStart = startDate.getTime();
      const selectedEnd = endDate.getTime();
      return (
        (selectedStart >= start && selectedStart <= end) || // Check if selected range starts within reserved range
        (selectedEnd >= start && selectedEnd <= end) ||   // Check if selected range ends within reserved range
        (selectedStart <= start && selectedEnd >= end)    // Check if selected range encompasses reserved range
      );
    });
  
    if (!isDateOverlapping) {
      setSelectionRange(ranges.selection);
      updateDateRange([startDate, endDate]);
      dispatch({
        type: 'UPDATE_DATE_RANGE',
        payload: [startDate, endDate],
      });
    } else {
      // Display an error message or notification to the user
      console.log('Selected dates overlap with reserved dates. Please select different dates.');
    }
  };

  const renderDay = (dateItem) => {
    const timestamp = dateItem.getTime(); // Convert to timestamp
    const isReserved = reservedDates.some(reservation => {
      const start = new Date(reservation.startDate).getTime();
      const end = new Date(reservation.endDate).getTime();
      return timestamp >= start && timestamp <= end;
    });
  
    const isSelected = (
      selectionRange.startDate.getTime() <= timestamp &&
      selectionRange.endDate.getTime() >= timestamp
    );
  
    const dayContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      borderRadius: '50%',
      backgroundColor: isReserved ? '#f0f0f0' : (isSelected ? '#b3e5fc' : 'transparent'),
      cursor: isReserved ? 'not-allowed' : 'pointer',
    };
  
    const dayNumberStyle = {
      color: isReserved ? '#888' : '#333',
    };
  
    return (
      <div style={dayContainerStyle}>
        <span style={dayNumberStyle}>{dateItem.getDate()}</span>
      </div>
    );
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 300, m: 1 },
      }}
    >
     <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '80%', marginRight: '60%' }}>
        <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            className="custom-date-range-picker"
            dayContentRenderer={(dateItem) => renderDay(dateItem)}
            staticRanges={[]} // Remove the default static ranges
            minDate={new Date()}
            showSelectionPreview={false}
            inputRanges={[]} // Remove input ranges
            direction="vertical" // Change direction to vertical
            calendarIcon={null} // Hide calendar icon
            rangeColors={["#3f51b5"]} // Customize range color
        />
    </div>
</div>
    </Stack>
  );
};

export default AddDate;

/*
The following sources helped to shape and create the following code 
https://www.youtube.com/watch?v=MpQbwtSiZ7E
https://www.youtube.com/watch?v=k3Vfj-e1Ma4&t=9062s
https://www.youtube.com/watch?v=YdBy9-0pER4&t=45609s
https://www.youtube.com/watch?v=CvCiNeLnZ00&t=7695s
https://www.youtube.com/watch?v=72iEz5iopqQ&t=770s
https://www.youtube.com/watch?v=eJ3YysWaP_A
https://www.youtube.com/watch?v=ANZNMaBODDY&list=PLufbXXGswL_pS6rdWbDO56oiZovLWE_rs
https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE
https://www.youtube.com/watch?v=Ldw3mFGyjDE&list=PL86WBCjNmqh5HQInLsyYW7g76_6eKcQLf
https://www.youtube.com/watch?v=R5RoYDEIhCI&list=PLy1nL-pvL2M5xNIuNapwmABwEy2uifAlY
https://www.youtube.com/watch?v=1vpwfDDyINk&list=PLyzY2l387AlMy6r_JhflipKqKrhVK17gP
Assistance from chatgpt was also used 
*/

