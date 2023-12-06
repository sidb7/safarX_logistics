import { date_DD_MMM, date_DD_MMM_YYY, date_DD_MMM_YYYY_HH_MM, date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";


describe('Date formatting functions', () => {
  const mockTimestamp = 1638787200000; // Replace with your preferred timestamp for testing

  test('date_DD_MMM_YYY function', () => {
    const formattedDate = date_DD_MMM_YYY(mockTimestamp);
    // Add assertions based on the expected output
    expect(formattedDate).toBe('Dec 07, 2021'); // Update with the expected output
  });

  test('date_DD_MMM_YYYY_HH_MM function', () => {
    const formattedDate = date_DD_MMM_YYYY_HH_MM(mockTimestamp);
    // Add assertions based on the expected output
    expect(formattedDate).toBe('Dec 07, 2021, 00:00 AM'); // Update with the expected output
  });

  test('date_DD_MMM_YYYY_HH_MM_SS function', () => {
    const formattedDate = date_DD_MMM_YYYY_HH_MM_SS(mockTimestamp);
    // Add assertions based on the expected output
    expect(formattedDate).toBe('Dec 07, 2021, 00:00:00 AM'); // Update with the expected output
  });

  test('date_DD_MMM function', () => {
    const formattedDate = date_DD_MMM(mockTimestamp);
    // Add assertions based on the expected output
    expect(formattedDate).toBe('Dec 07'); // Update with the expected output
  });
});
