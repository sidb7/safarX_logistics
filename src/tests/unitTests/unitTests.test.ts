// @ts-nocheck

import { date_DD_MMM, date_DD_MMM_YYY, date_DD_MMM_YYYY_HH_MM, date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { convertXMLToXLSX } from "../../utils/helper";
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




jest.mock('xlsx', () => ({
  utils: {
    json_to_sheet: jest.fn(),
    book_new: jest.fn(),
    book_append_sheet: jest.fn(),
  },
  write: jest.fn(),
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('convertXMLToXLSX function', () => {
  const apiData = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
  const filename = 'example.xlsx';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('convertXMLToXLSX successfully converts and saves the file', async () => {
    // Mock XLSX functions
    XLSX.utils.json_to_sheet.mockReturnValue('mockedWorksheet');
    XLSX.utils.book_new.mockReturnValue('mockedWorkbook');
    XLSX.write.mockResolvedValue('mockedBlob');

    // Call the function
    const result = await convertXMLToXLSX(apiData, filename);

    // Assertions
    expect(result).toBe(true);
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(apiData);
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith('mockedWorkbook', 'mockedWorksheet', 'Sheet 1');
    expect(XLSX.write).toHaveBeenCalledWith('mockedWorkbook', { bookType: 'xlsx', type: 'array' });
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      new Blob(['mockedBlob'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      }),
      filename
    );
  });

  test('convertXMLToXLSX handles errors and returns false', async () => {
    // Mock XLSX functions to simulate an error
    XLSX.utils.json_to_sheet.mockImplementation(() => {
      throw new Error('Mocked error');
    });

    // Call the function
    const result = await convertXMLToXLSX(apiData, filename);

    // Assertions
    expect(result).toBe(false);
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(apiData);
    // Add more assertions if needed for error handling
  });
});
