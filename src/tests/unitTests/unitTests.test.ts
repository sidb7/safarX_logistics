// @ts-nocheck

import { date_DD_MMM, date_DD_MMM_YYY, date_DD_MMM_YYYY_HH_MM, date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { convertXMLToXLSX } from "../../utils/helper";
import * as ApiUrls from '../../utils/ApiUrls';
import * as webService from '../../utils/webService';

import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  maskMobileNumber,
  capitalizeFirstLetter,
  GetCurrentPath,
  getQueryJson,
  generateUniqueCode,
  searchResults,
  convertEpochToDateTime,
  tokenKey,
  titleCase,
  loadPhonePeTransaction,
  loadRazorPayTransaction,
} from '../../utils/utility';


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
    XLSX.utils.json_to_sheet.mockReturnValue('mockedWorksheet');
    XLSX.utils.book_new.mockReturnValue('mockedWorkbook');
    XLSX.write.mockResolvedValue('mockedBlob');

    const result = await convertXMLToXLSX(apiData, filename);

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
    XLSX.utils.json_to_sheet.mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const result = await convertXMLToXLSX(apiData, filename);

    // 
    expect(result).toBe(false);
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(apiData);
  });
});



jest.mock('../../utils/ApiUrls', () => ({
  Environment: 'test',
  INITIAL_RECHARGE: 'test_initial_recharge_url',
  RECHARGE_STATUS: 'test_recharge_status_url',
  SELLER_WEB_URL: 'test_seller_web_url',
}));

jest.mock('../../utils/webService', () => ({
  POST: jest.fn(),
}));

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

 const localStorageMock = (function () {
    let store: Record<string, any> = {};

    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: any) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  test('setLocalStorage function', () => {
    setLocalStorage('testKey', 'testValue');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', 'testValue');
  });

  test('getLocalStorage function', () => {
    localStorageMock.getItem.mockReturnValue('testStoredValue');
    const result = getLocalStorage('testKey');
    expect(result).toBe('testStoredValue');
  });

  test('removeLocalStorage function', () => {
    removeLocalStorage('testKey');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('testKey');
  });

  test('clearLocalStorage function', () => {
    clearLocalStorage();
    expect(localStorageMock.clear).toHaveBeenCalled();
  });

  webService.POST.mockResolvedValue({ data: { success: true } });

  test('loadPhonePeTransaction function', async () => {
    await loadPhonePeTransaction('100', 'test_redirect_url', 'test_callback_url');
    expect(webService.POST).toHaveBeenCalledWith(
      'test_initial_recharge_url',
      expect.objectContaining({
        paymentObject: {
          amount: '10000', // Converted to paise
          redirectUrl: 'test_redirect_url',
          callbackUrl: 'test_callback_url',
        },
        paymentGateway: 'PHONEPE',
      })
    );
  });

  test('loadRazorPayTransaction function', async () => {
    const result = await loadRazorPayTransaction(100, 'testCompany', 'testUser', 'test@example.com', 'test_redirect_url');
    expect(webService.POST).toHaveBeenCalledWith(
      'test_initial_recharge_url',
      expect.objectContaining({
        paymentObject: {
          amount: '10000', // Converted to paise
          callbackUrl: 'test_redirect_url',
        },
        paymentGateway: 'RAZORPE',
      })
    );

    expect(result).toMatchObject({
      key: expect.any(String),
      amount: '10000',
      currency: 'INR',
      name: 'testCompany',
    // order_id: expect.anything(),
      handler: expect.any(Function),
      prefill: {
        name: 'testUser',
        email: 'test@example.com',
      },
      theme: {
        color: '#3399cc',
      },
    });
  });
});

