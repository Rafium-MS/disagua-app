import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // future: safe IPC handlers
})
