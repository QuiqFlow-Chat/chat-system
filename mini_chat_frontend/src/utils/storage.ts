class TokenStorage {
    private key: string;
  
    constructor(key: string) {
      this.key = key;
    }
  
    save(token: string): void {
      localStorage.setItem(this.key, token);
    }
  
    load(): string | null {
      return localStorage.getItem(this.key);
    }
  
    clear(): void {
      localStorage.removeItem(this.key);
    }
  }
  
  const tokenStorage = new TokenStorage('token');
  
  export default tokenStorage;
  