export const date_DD_MMM_YYY = (epochTimestamp: number) => {
  const date = new Date(epochTimestamp);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(date);

  return formattedDate;
};

export const date_DD_MMM_YYYY_HH_MM = (epochTimestamp: number) => {
  const date = new Date(epochTimestamp);
  const dateOptions: any = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions: any = { hour: "2-digit", minute: "2-digit" };

  const formattedDate = date.toLocaleDateString("en-IN", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-IN", timeOptions);

  return `${formattedDate}, ${formattedTime}`;
};

export const date_DD_MMM_YYYY_HH_MM_SS = (epochTimestamp: number) => {
  const date = new Date(epochTimestamp);
  const dateOptions: any = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions: any = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDate = date.toLocaleDateString("en-IN", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-IN", timeOptions);

  return `${formattedDate}, ${formattedTime}`;
};

export const date_DD_MMM = (epochTimestamp: number) => {
  const date = new Date(epochTimestamp);
  const options: any = { month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-IN", options)?.format(date);

  return formattedDate;
};