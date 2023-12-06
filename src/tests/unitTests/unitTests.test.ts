import { date_DD_MMM, date_DD_MMM_YYY, date_DD_MMM_YYYY_HH_MM, date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";

describe('Date formatting functions', () => {
  const mockTimestamp = 1701855494000; 

  test('date_DD_MMM_YYY function', () => {
    const formattedDate = date_DD_MMM_YYY(mockTimestamp);
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const locale = 'en-IN';
    const expected = new Intl.DateTimeFormat(locale, options).format(new Date(mockTimestamp));
    expect(formattedDate).toBe(expected);
  });

  test('date_DD_MMM_YYYY_HH_MM function', () => {
    const formattedDate = date_DD_MMM_YYYY_HH_MM(mockTimestamp);
    const dateOptions: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions: any = { hour: '2-digit', minute: '2-digit' };
    const locale = 'en-IN';
    const date = new Date(mockTimestamp);
    const expectedDate = date.toLocaleDateString(locale, dateOptions);
    const expectedTime = date.toLocaleTimeString(locale, timeOptions);
    const expected = `${expectedDate}, ${expectedTime}`;
    expect(formattedDate).toBe(expected);
  });

  test('date_DD_MMM_YYYY_HH_MM_SS function', () => {
    const formattedDate = date_DD_MMM_YYYY_HH_MM_SS(mockTimestamp);
    const dateOptions: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions: any = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const locale = 'en-IN';
    const date = new Date(mockTimestamp);
    const expectedDate = date.toLocaleDateString(locale, dateOptions);
    const expectedTime = date.toLocaleTimeString(locale, timeOptions);
    const expected = `${expectedDate}, ${expectedTime}`;
    expect(formattedDate).toBe(expected);
  });

  test('date_DD_MMM function', () => {
    const formattedDate = date_DD_MMM(mockTimestamp);
    const options: any = { month: 'short', day: 'numeric' };
    const locale = 'en-IN';
    const expected = new Intl.DateTimeFormat(locale, options)?.format(new Date(mockTimestamp));
    expect(formattedDate).toBe(expected);
  });
});
