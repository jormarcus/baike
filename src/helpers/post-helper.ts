export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  const subString = str.substring(0, num);
  return subString.substring(0, subString.lastIndexOf(' '));
}
