
/**
 * 
 * obtains date object from string with format 'dd-MM-yyyy'
 */
export function dateFromFormat(format: string): Date {
  const [ day, month, year ] = format.split("-").map(item => parseInt(item));
  return new Date(year, month - 1, day);
}

/**
 * 
 * obtains string from date object with format 'dd-MM-yyyy'
 */
export function formatFromDate(date: Date): string {
  const [ day, month, year ] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  return `${day}-${month}-${year}`;
}