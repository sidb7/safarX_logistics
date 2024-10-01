//getting the path of the current page
export const PathFinder = (url: any) => {
  const parsedUrl = new URL(url);
  let path = parsedUrl.pathname;
  const pathparts = path.split("/")[1];
  return pathparts;
};
