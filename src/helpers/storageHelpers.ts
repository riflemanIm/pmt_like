// helpers/storageHelpers.ts

export function saveToLocalStorage<T>(
  key: string,
  value: T extends object ? T : T
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (value === null || value === undefined) {
      // удаляем, если явно передали null/undefined
      window.localStorage.removeItem(key);
    } else if (typeof value === "string") {
      // сохраняем «сырой» текст
      window.localStorage.setItem(key, value);
    } else {
      // всё остальное — через JSON
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(
      `Error saving to localStorage: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error removing from localStorage: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }
}

export function getFromLocalStorage<T extends object>(
  key: string
): T | string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const data = window.localStorage.getItem(key);
  if (data === null) {
    return null;
  }
  try {
    // попытаемся распарсить как JSON
    return JSON.parse(data);
  } catch {
    // не JSON — вернём просто строку
    return data;
  }
}
