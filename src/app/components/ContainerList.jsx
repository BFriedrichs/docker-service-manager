const React = require('react')
const Docker = require('comm/dockerRenderer')

const Button = require('components/Button')


class ContainerList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'containers': []
    }
  }

  componentDidMount() {
    this.loadContainers()
  }

  loadContainers() {
    Docker.listContainers().then((containers) => {
      this.setState({'containers': containers})
    })
  }

  startContainer(containerId) {
    Docker.startContainer(containerId).then(() => {
      this.loadContainers()
    })
  }

  stopContainer(containerId) {
    Docker.stopContainer(containerId).then(() => {
      this.loadContainers()
    })
  }

  render() {
    return (
      <div id="containerList">
        {
          this.state.containers.map((container, i) => {
            const isRunning = container.State == 'running'
            let iconName = "listIcon fas"
            let button = null
            if (isRunning) {
              iconName += ' fa-check-circle serviceRunning'
              button = <Button label="Stop" onClick={this.stopContainer.bind(this, container.Id)}/>
            } else {
              iconName += ' fa-times-circle serviceStopped'
              button = <Button label="Start" onClick={this.startContainer.bind(this, container.Id)}/>
            }

            let status = container.Status.split(')')
            if (status.length == 1) {
              status = status[0]
              status = status.split('Up ')[1]
            } else {
              status = status[1]
              status = status.split(' ago')[0]
            }
            return (
              <div className="containerListItem" key={'listItem_' + i}>
                <i className={iconName} />
                <div className="listContent">
                  <div className="serviceName">{container.Names[0]}</div>
                  <div>{status}</div>
                  <div className="buttonArea">
                    {button}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


module.exports = ContainerList