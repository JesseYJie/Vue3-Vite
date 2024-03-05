class LocalStorage {
  private constructor() {}

  private static instance: LocalStorage | null = null

  static getInstance() {
    if (LocalStorage.instance === null) {
      LocalStorage.instance = new LocalStorage()
    }
    return LocalStorage.instance
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value)
  }

  getItem(key: string) {
    return localStorage.getItem(key)
  }

  removeItem(key: string) {
    localStorage.removeItem(key)
  }

  removeAll() {
    localStorage.clear()
  }
}

export default LocalStorage.getInstance()
