export const aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/gm;
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/gm;
// export const gstRegex =
//   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/gm;
export const gstRegex =
  /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1})$/gm;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const strongpasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
export const textRegex = /^[a-zA-Z]+$/;
export const referalRegex = /[A-Z][A-Z0-9]+/;
