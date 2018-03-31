class Channel {
	constructor(name) {
  	this.name = name
  }

  get response() {
  	return `${this.name}.Response`
  }
}

const allChannels = [
  'listContainers',
  'startContainer',
  'stopContainer',
  'deleteContainer'
]

const reduced = allChannels.reduce((channels, name) => {
  channels[name] = new Channel(name)
  return channels
}, {})

module.exports = reduced