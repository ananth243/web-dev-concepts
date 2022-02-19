export default function validateUrl(url) {
  try {
    arr = url.split(":");
    if (
      arr[0] === "http" &&
      arr[1] === "//localhost" &&
      !arr[2].includes("/")
    ) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
}
