class StorageUtil<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  save(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  load(): T | null {
    const item = localStorage.getItem(this.key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (e) {
        console.error(`Error parsing ${this.key} from localStorage:`, e);
        return null;
      }
    }
    return null;
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}

const tokenStorage = new StorageUtil<string>('token');
const userStorage = new StorageUtil<{ id: string; email: string; fullName: string }>('user');

export { tokenStorage, userStorage };