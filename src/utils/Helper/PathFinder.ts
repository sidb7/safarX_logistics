//getting the path of the current page
export const PathFinder = (url: any) => {
  const parsedUrl = new URL(url);
  let path = parsedUrl.pathname;
  let pathparts: any = path.split("/");
  pathparts = pathparts[pathparts?.length - 1];
  return pathparts;
};
