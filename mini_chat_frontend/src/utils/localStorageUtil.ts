class StorageUtil<StoredValue> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  save(value: StoredValue): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  load(): StoredValue | null {
    const item = localStorage.getItem(this.key);
    if (item) {
      try {
        return JSON.parse(item) as StoredValue;
      } catch (error) {
        console.error(`Error parsing ${this.key} from localStorage:`, error);
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