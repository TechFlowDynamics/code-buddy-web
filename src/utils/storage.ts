// utils/storageUtils.ts

type StorageType = "localStorage" | "sessionStorage";

/**
 * Utility function to get storage (local or session)
 */
const getStorage = (type: StorageType): Storage => {
  return type === "localStorage" ? localStorage : sessionStorage;
};

/**
 * Sets an item in storage
 * @param key - the key to store the value under
 * @param value - the value to store (string or object)
 * @param storageType - 'localStorage' or 'sessionStorage'
 */
export const setItem = (
  key: string,
  value: object | string | number | Array<object | string | number>,
  storageType: StorageType = "localStorage",
): void => {
  try {
    const storage = getStorage(storageType);
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    storage.setItem(key, valueToStore);
  } catch (error) {
    console.error(`Error setting ${key} in ${storageType}:`, error);
  }
};

/**
 * Gets an item from storage
 * @param key - the key to retrieve the value
 * @param storageType - 'localStorage' or 'sessionStorage'
 * @returns the parsed value or null if not found
 */
export const getItem = <T>(
  key: string,
  storageType: StorageType = "localStorage",
): T | null => {
  try {
    const storage = getStorage(storageType);
    const item = storage.getItem(key);
    if (!item) return null;
    const valueToProcess = typeof item === "string" ? item : JSON.parse(item);
    return item ? valueToProcess : null;
  } catch (error) {
    console.error(`Error getting ${key} from ${storageType}:`, error);
    return null;
  }
};

/**
 * Removes an item from storage
 * @param key - the key to remove
 * @param storageType - 'localStorage' or 'sessionStorage'
 */
export const removeItem = (
  key: string,
  storageType: StorageType = "localStorage",
): void => {
  try {
    const storage = getStorage(storageType);
    storage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from ${storageType}:`, error);
  }
};

/**
 * Clears all items in storage
 * @param storageType - 'localStorage' or 'sessionStorage'
 */
export const clearStorage = (
  storageType: StorageType = "localStorage",
): void => {
  try {
    const storage = getStorage(storageType);
    storage.clear();
  } catch (error) {
    console.error(`Error clearing ${storageType}:`, error);
  }
};

const defaultStorage = {
  setItem,
  getItem,
  removeItem,
  clearStorage,
};
export default defaultStorage;
