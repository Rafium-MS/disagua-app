const KEYS = ['brands', 'stores', 'partners', 'connections', 'reportData']
const DB_NAME = 'disagua-offline-cache'
const STORE_NAME = 'kv'

const hasIndexedDB = typeof indexedDB !== 'undefined'
const hasLocalStorage = typeof localStorage !== 'undefined'

let dbPromise = null

function openDatabase(){
  if(!hasIndexedDB){
    return Promise.reject(new Error('IndexedDB is not available in this environment'))
  }
  if(!dbPromise){
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)
      request.onupgradeneeded = () => {
        const db = request.result
        if(!db.objectStoreNames.contains(STORE_NAME)){
          db.createObjectStore(STORE_NAME)
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  return dbPromise
}

async function idbSet(key, value){
  if(!hasIndexedDB){
    return false
  }
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.put(value, key)
    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}

async function idbGet(key){
  if(!hasIndexedDB){
    return null
  }
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(key)
    request.onsuccess = () => resolve(request.result ?? null)
    request.onerror = () => reject(request.error)
  })
}

export async function syncLocalStorageToIndexedDB(){
  if(!hasLocalStorage){
    return false
  }
  try{
    for(const k of KEYS){
      const raw = localStorage.getItem(k)
      if(raw !== null){
        await idbSet(k, raw)
      }
    }
    return true
  }catch(e){
    console.warn('IndexedDB sync error:', e)
    return false
  }
}

export async function loadFromIndexedDBToLocalStorage(){
  if(!hasLocalStorage){
    return false
  }
  try{
    for(const k of KEYS){
      const raw = await idbGet(k)
      if(raw !== null && localStorage.getItem(k) === null){
        localStorage.setItem(k, raw)
      }
    }
    return true
  }catch(e){
    console.warn('IndexedDB load error:', e)
    return false
  }
}
