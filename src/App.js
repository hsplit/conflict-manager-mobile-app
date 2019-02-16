import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Header from './components/Header'
import NavBar from './components/NavBar'

import { HOME } from './constants/routes'
import router from './router'
import { getStatus } from './api'
import { getCurrentTime } from './utils/date'

export default class App extends Component {
  state = {
    route: HOME,
    connectionStatus: 'Disconnected',
    api: 'http://',
    token: '',
    data: {},
  }

  setApi = (api, token) => {
    this.setState({
      api,
      token,
    }, () => {
      if (this.state.connectionStatus !== 'Connected') {
        this.getConflicts(true)
      }
    })
  }

  getConflicts = (isInit = false) => {
    if (this.state.connectionStatus !== 'Connected') {
      this.setState({
        connectionStatus: 'Loading...',
      })
    }
    getStatus(this.state.api, this.state.token, isInit)
      .then(data => {
        this.setState({
          connectionStatus: 'Connected',
          data: {
            error: null,
            ...data,
            lastUpdate: getCurrentTime(),
          },
        })
        this.getConflicts()
      })
      .catch(err => {
        this.setState({
          connectionStatus: 'Lost connection',
          data: {
            error: err.message,
            lastUpdate: getCurrentTime(),
          },
        })
      })
  }

  setRout = route => {
    this.setState({ route })
  }

  render () {
    const { route, connectionStatus, data, api, token } = this.state
    const Layout = router(route)
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <Layout connectionStatus={connectionStatus} data={data} setApi={this.setApi} api={api} token={token} />
        </View>
        <NavBar route={route} setRoute={this.setRout} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#8bcfc6',
    width: '100%',
    flex: 8,
    textAlign: 'center',
    color: '#333333',
  },
})
