
/**
 * 
 * obtains date object from string with format 'dd-MM-yyyy'
 */
export function dateFromFormat(format: string): Date {
  const [ day, month, year ] = format.split("-").map(item => parseInt(item));
  return new Date(year, month - 1, day);
}