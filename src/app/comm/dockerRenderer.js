const {ipcRenderer} = require('electron')
const Channels = require('./channels')


class Docker {
  constructor() {

  }

  send(channel, args) {
    ipcRenderer.send(channel.name, args)
    return new Promise((resolve, reject) => {
      ipcRenderer.once(channel.response, (sender, value) => {
        resolve(value)
      })
    }).catch((reason) => {
      console.log(reason)
    })
  }

  listContainers() {
    return this.send(Channels.listContainers)
  }

  startContainer(containerId) {
    return this.send(Channels.startContainer, containerId)
  }

  stopContainer(containerId) {
    return this.send(Channels.stopContainer, containerId)
  }
}

module.exports = new Docker()