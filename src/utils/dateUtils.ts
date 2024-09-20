// dateUtils.ts

type DateInput = string | number | Date;

/**
 * Parses a date input into a Date object.
 * @param {DateInput} dateInput - The input date to parse.
 * @returns {Date|null} The parsed Date object, or null if parsing fails.
 */
export const parseDate = (dateInput: DateInput): Date | null => {
  if (!dateInput) return null;
  
  // If it's already a Date object, return it
  if (dateInput instanceof Date) return dateInput;
  
  // If it's a number, assume it's a timestamp
  if (typeof dateInput === 'number') return new Date(dateInput);
  
  // If it's a string, try parsing it
  if (typeof dateInput === 'string') {
    // Try parsing as ISO format
    let date = new Date(dateInput);
    if (!isNaN(date.getTime())) return date;
    
    // Try parsing common formats
    const formats = [
      /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/, // DD-MM-YYYY or DD/MM/YYYY
      /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/, // YYYY-MM-DD or YYYY/MM/DD
      /^(\d{1,2})[-/](\d{1,2})[-/](\d{2})$/  // DD-MM-YY or DD/MM/YY
    ];
    
    for (let format of formats) {
      const parts = dateInput.match(format);
      if (parts) {
        if (format === formats[0]) date = new Date(Number(parts[3]), Number(parts[2]) - 1, Number(parts[1]));
        else if (format === formats[1]) date = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
        else date = new Date(2000 + Number(parts[3]), Number(parts[2]) - 1, Number(parts[1]));
        
        if (!isNaN(date.getTime())) return date;
      }
    }
  }
  
  return null; // If all parsing attempts fail
};

/**
 * Formats a date input into a string.
 * @param {DateInput} dateInput - The input date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateInput: DateInput): string => {
  if (!dateInput) return 'N/A';
  const date = parseDate(dateInput);
  if (!date) return 'Invalid Date';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const month = months[date.getMonth()];
  const day = pad(date.getDate());
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day} ${month}, ${year} ${hours}:${minutes}:${seconds}`;
};