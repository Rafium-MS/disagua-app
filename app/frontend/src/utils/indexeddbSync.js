import { set as idbSet, get as idbGet } from 'idb-keyval'
const KEYS = ['brands','stores','partners','connections','reportData']
export async function syncLocalStorageToIndexedDB(){
  try{ for(const k of KEYS){ const raw = localStorage.getItem(k); if(raw!==null) await idbSet(k, raw) } return true }catch(e){ console.warn('IndexedDB sync error:', e); return false }
}
export async function loadFromIndexedDBToLocalStorage(){
  try{ for(const k of KEYS){ const raw = await idbGet(k); if(raw && localStorage.getItem(k)===null){ localStorage.setItem(k, raw) } } return true }catch(e){ console.warn('IndexedDB load error:', e); return false }
}
