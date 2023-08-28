export const date_DD_MMM_YYY = (epochTimestamp: number) => {
  const date = new Date(epochTimestamp);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(date);
  console.log(formattedDate);
  return formattedDate;
};
