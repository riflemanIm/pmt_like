import md5 from "md5";
import { NextApiRequest } from "next";

const SOL1 = "kj5tph324gd;";
const SOL2 = "lru47stc&GY";

export const MASK_PHONE = "+7 (999) 999 9999";

export const removeHtml = (text: string) => {
  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, "");
};

export function getYearNow() {
  const dateNow = new Date();
  return dateNow.getFullYear();
}

export function getYearCompany() {
  const dateNow = new Date();
  const number = dateNow.getFullYear() - 1999;
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ["год", "года", "лет"];
  const plural =
    titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  return `${number} ${plural}`;
}

export const cleanPhoneValue = (value: string | null) => {
  if (value == null) return "";
  // удаляем разрешенные символы
  const cleanValue = value.replace(/[\s+()-]/gi, "");
  const numbers = cleanValue.replace(/[^\d]/gi, "");
  return numbers;
};

function financial(x: string) {
  return Number.parseFloat(x).toFixed(2);
}
export const priceReal = (isUsd: boolean, value: number, usd: number) =>
  (!isUsd ? value * usd : value).toFixed(2);

export const upperFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const clientIp = (req: NextApiRequest) => {
  let ip = req.headers["x-real-ip"];
  const forwardedFor = req.headers["x-forwarded-for"] as string;
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").shift() ?? req.socket?.remoteAddress;
  }

  return ip;
};

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

// export function groupBy<T, K extends keyof T>(
//   arr: T[],
//   key: K,
//   convertKeyVal?: (val: T[K]) => string
// ) {
//   // eslint-disable-next-line
//   const initialValue = {} as any;
//   return arr.reduce((acc, item) => {
//     const convKey =
//       convertKeyVal != null ? convertKeyVal(item[key]) : item[key];
//     acc[convKey] = [...(acc[convKey] || []), item];
//     return acc;
//   }, initialValue);
//}

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

// export function chunksArray<T>(inputArray: T[], perChunk: number) {
//   return inputArray.reduce((resultArray: T[][], item: T, index: number) => {
//     const chunkIndex = Math.floor(index / perChunk);

//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = [] as T[]; // start a new chunk
//     }

//     resultArray[chunkIndex].push(item);

//     return resultArray;
//   }, []);
// }

export function isArray(obj: []) {
  return obj instanceof Array;
}
export const getParam = (queryString: string, param: string) => {
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

export default isEmpty;
