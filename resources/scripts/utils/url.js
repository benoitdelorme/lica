export function getSlugFromUrl(url) {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  const slug = pathParts.pop() || pathParts.pop();

  return slug;
}