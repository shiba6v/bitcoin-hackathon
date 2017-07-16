import URLSearchParams from 'url-search-params';

export default (url, params) => {
  const urlSearchParams = new URLSearchParams();
  const keys = Object.keys(params);

  if (keys.length === 0) return url;

  keys.forEach(key => {
    if (Array.isArray(params[key])) {
      params[key].forEach(v => urlSearchParams.set(`${key}[]`, v));
    } else if (typeof params[key] !== 'undefined') {
      urlSearchParams.set(key, params[key]);
    }
  });

  return `${url}?${urlSearchParams.toString()}`;
}
