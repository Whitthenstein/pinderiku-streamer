export const getUrl = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};

export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:30:00Z");
  t.setSeconds(secs);

  return t;
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(Math.round(seconds) / 60);
  const secondsRemainder = Math.round(seconds) % 60;
  const paddedSeconds = `0${secondsRemainder}`.slice(-2);
  return `${minutes}:${paddedSeconds}`;
};
