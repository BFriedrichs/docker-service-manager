const React = require('react')
require('./style')

const ContainerList = require('components/ContainerList')

import { hot } from 'react-hot-loader'


class Main extends React.Component {
  render() {
    return (
      <div>
        <ContainerList />
      </div>
    )
  }
}

const HotMain = hot(module)(Main)
module.exports.Main = Main
module.exports.HotMainInstance = <HotMain />