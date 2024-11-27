const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('todoAPI', {
  loadTodos: () => ipcRenderer.invoke('read-todos'), 
  saveTodos: (todos) => ipcRenderer.invoke('write-todos', todos), 
});

//magi???? api shenanigans