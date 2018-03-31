const Docker = require('dockerode')
const {ipcMain} = require('electron')

const Channels = require('./app/comm/channels')


const dockerInstance = new Docker()

module.exports.init = () => {
  ipcMain.on(Channels.listContainers.name, (event, arg) => {
    dockerInstance.listContainers({all: true}).then((containers) => {
      event.sender.send(Channels.listContainers.response, containers)
    })
  })

  ipcMain.on(Channels.startContainer.name, (event, containerId) => {
    dockerInstance.getContainer(containerId).start().then(() => {
      event.sender.send(Channels.startContainer.response)
    })
  })

  ipcMain.on(Channels.stopContainer.name, (event, containerId) => {
    dockerInstance.getContainer(containerId).stop().then(() => {
      event.sender.send(Channels.stopContainer.response)
    })
  })
}

