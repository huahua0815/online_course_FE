export const getAssetsFile = (url) => {
  let  res = new URL(`/src/assets/${url}`, import.meta.url).href
  return res
};
