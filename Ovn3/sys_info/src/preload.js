const { contextBridge } = require('electron');
const os = require('os'); // Ensure os is imported

// Expose system information securely to the renderer process
contextBridge.exposeInMainWorld('systemInfo', {
  getSystemInfo: () => {
    return {
      platform: os.platform(),
      arch: os.arch(),
      cpu: os.cpus(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      uptime: os.uptime(),
      hostname: os.hostname(),
    };
  },
});
