export const isRequired = (
  myValue: string,
  error: any = "Field is required"
) => {
  const value = myValue?.toString()?.trim();
  if (!value || value === undefined || value === "" || value === null)
    return error;
  return true;
};

export const isGreaterThenValidation = (
  value: any,
  length: number = 5,
  error: any = ""
) => {
  if (value.toString().length > length) {
    return true;
  }
  return error || `Value must be greater then ${length}`;
};

export const checkNonNegative = (value: any) => {
  if (value < 0) {
    return "Value should be non-negative number";
  }
  return true;
};

export const greaterThenZero = (value: any) => {
  if (value <= 0) {
    return "Value must be greater then zero";
  }
  return true;
};
