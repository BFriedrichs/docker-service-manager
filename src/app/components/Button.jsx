const React = require('react')

class Button extends React.Component {
  render() {
    return (
      <div className="clickButton"
           onClick={this.props.onClick}>
       {this.props.label}
      </div>
    )
  }
}

module.exports = Button