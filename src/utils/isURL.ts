export const isURL = (url?: string) => {
  if (!url) return false;
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
