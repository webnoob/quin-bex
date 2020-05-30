import { v4 as uuidv4 } from 'uuid'

const getAll = () => {
  return new Promise(resolve => {
    chrome.storage.local.get(null, r => {
      const result = []

      // Group the items up into an array to take advantage of the bridge's chunk splitting.
      for (const itemKey in r) {
        result.push(r[itemKey])
      }

      resolve(result)
    })
  })
}

const getByKey = key => {
  return new Promise(resolve => {
    chrome.storage.local.get([key], r => {
      resolve(r[key])
    })
  })
}

const getByType = type => {
  return getAll().then(r => {
    return r.filter(f => f.type !== void 0 && f.type === type)
  })
}

const set = (key, data) => {
  return new Promise(resolve => {
    chrome.storage.local.set({ [key]: data }, () => {
      resolve()
    })
  })
}

const remove = (key) => {
  return new Promise(resolve => {
    chrome.storage.local.remove(key, () => {
      resolve()
    })
  })
}

const add = (type, data) => {
  console.log('adding', type, data)
  const id = data.id || uuidv4()
  const key = type + '.' + id
  const model = {
    ...data,
    id,
    type
  }

  return set(key, model).then(() => {
    return {
      ...model,
      key
    }
  })
}

export default {
  add,
  getAll,
  getByKey,
  getByType,
  remove,
  set
}
