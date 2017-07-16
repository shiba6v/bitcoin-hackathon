const isObject = x => x !== null && typeof x === 'object';

const translateWith = (f) => {
  return (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => translateWith(f)(v));
    } else if (isObject(obj) && !(obj instanceof Date) && !(obj instanceof File) && !(obj instanceof FormData)) {
      const newObj = {};

      Object.entries(obj).forEach(([key, value]) => {
        const newKey = f(key);
        if (isObject(value)) {
          newObj[newKey] = translateWith(f)(value);
        } else {
          newObj[newKey] = value;
        }
      })

      return newObj;
    } else {
      return obj;
    }
  };
};

export default new class ObjectKeyTranslator {
  camelToSnake(obj) {
    const camelTo_snake = (str) => str.replace(
      /[A-Z]/g,
      (match) => '_' + match.toLowerCase()
    );
    return translateWith(camelTo_snake)(obj);
  }

  snakeToCamel(obj) {
    const snake_toCamel = (str) => str.replace(
      /_[a-z]/g,
      (match) => match.slice(1).toUpperCase()
    );
    return translateWith(snake_toCamel)(obj);
  }

  translateWith(f) {
    return translateWith(f);
  }
}
