import md5 from "md5";
const SOL1 = "kj5tph324gd;";
const SOL2 = "lru47stc&GY";
import { NextApiRequest } from "next";

export const removeHtml = (text: string) => {
  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, "");
};

function financial(x: string) {
  return Number.parseFloat(x).toFixed(2);
}
export const priceReal = (isUsd: boolean, value: number, usd: number) =>
  (!isUsd ? value * usd : value).toFixed(2);

export const upperFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
export const parseIp = (req: NextApiRequest) =>
  (req.headers["x-forwarded-for"] as string).split(",").shift() ||
  req.socket?.remoteAddress;

export const password = (pass: string) => md5(`${SOL1}${pass}${SOL2}`);

export const sign = (
  merchId: number,
  price: number,
  secret: string,
  currency: string,
  ordId: number
) => {
  return md5(`${merchId}:${price}:${secret}:${currency}:${ordId}`);
};

export function getError(err: any) {
  //  console.log("=== err ===", err);
  if (typeof err === "string") return err;

  if (
    typeof err?.response?.data === "object" &&
    err?.response?.data?.message != null
  )
    return err?.response?.data?.message;

  return "Error";
}
export function getUrlbyLang(route: string, locale: string) {
  const prefix = route.charAt(0) !== "/" ? "/" : "";
  return locale === "ru"
    ? `${prefix}${route}`
    : `${prefix}${locale}${prefix}${route}`;
}

// eslint-disable-next-line
export function getNumber(value: any, defaultValue = null) {
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
}

const isEmpty = (value: unknown) => {
  return (
    value == null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
export const ifEmptyArr = (value: unknown) => {
  return !isEmpty(value) ? value : [];
};

// eslint-disable-next-line
export const isString = (val: any) => {
  return typeof val === "string";
};

export function isNumeric(n: string | number) {
  return !isNaN(parseFloat(n as string)) && isFinite(n as number);
}

// const groupBys = <T, K extends keyof any>(
//   list: T[],
//   getKey: (item: T) => K,
// ) =>
//   list.reduce((previous, currentItem) => {
//     const group = getKey(currentItem);
//     if (!previous[group]) previous[group] = [];
//     previous[group].push(currentItem);
//     return previous;
//   }, {} as Record<K, T[]>);

export function groupBy<T, K extends keyof T>(
  arr: T[],
  key: K,
  convertKeyVal?: (val: T[K]) => string
) {
  // eslint-disable-next-line
  const initialValue = {} as any;
  return arr.reduce((acc, item) => {
    const convKey =
      convertKeyVal != null ? convertKeyVal(item[key]) : item[key];
    acc[convKey] = [...(acc[convKey] || []), item];
    return acc;
  }, initialValue);
}

// export function groupByKey<T, K extends keyof T>(
//   list: T[],
//   key: K,
//   { omitKey = false },
// ) {
//   return list.reduce(
//     (hash, { [key]: value, ...rest }) => ({
//       ...hash,
//       [value]: (hash[value] || []).concat(
//         omitKey ? { ...rest } : { [key]: value, ...rest },
//       ),
//     }),
//     {},
//   );
// }

export function chunksArray<T>(inputArray: T[], perChunk: number) {
  return inputArray.reduce((resultArray: T[][], item: T, index: number) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] as T[]; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

export function isArray(obj: []) {
  return obj instanceof Array;
}

export default isEmpty;
