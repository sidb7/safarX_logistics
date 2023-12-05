export const aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/gm;
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/gm;
// export const gstRegex =
//   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/gm;
//mobile np. regex for the numbers starting from 6
export const mobileRegex = /^[6-9]\d{9}$/gm;
export const gstRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}[0-9A-Z]{1}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const strongpasswordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=;':"|,.<>/?])([A-Za-z\d!@#$%^&*()_+\-=;':"|,.<>/?]+)$/;
export const textRegex = /^[a-zA-Z]+$/; ///^[A-Za-z]+$/;
export const referalRegex = /[A-Z][A-Z0-9]+/;
export const emptyOrFullTextRegex = /^[a-zA-Z]*$/;
