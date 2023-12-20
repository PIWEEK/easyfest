class AbstractStorageManager {
  get (key) {
    if (this.storage) {
      const data = this.storage.getItem(key)

      try {
        return JSON.parse(data)
      }
      catch (err) {
        return data
      }
    }
  }

  set (key, newValue = undefined) {
    if (this.storage) {
      this.storage.setItem(
        key,
        JSON.stringify(newValue)
      )
    }

    return newValue
  }

  remove (key) {
    if (this.storage) {
      this.storage.removeItem(key)
    }

    return true
  }

  clear () {
    if (this.storage) {
      this.storage.clear()
    }

    return true
  }
}

class LocalStorageManager extends AbstractStorageManager {
  constructor () {
    super()
    if (typeof(window) !== "undefined") {
      this.storage = window.localStorage
    }
  }
}

export const localStorage = new LocalStorageManager()