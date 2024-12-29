// helpers/storageHelpers.ts

export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error saving to localStorage: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
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

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(
        `Error reading from localStorage: ${
          error instanceof Error ? error.message : error
        }`
      );
      return null;
    }
  }
  return null;
}
