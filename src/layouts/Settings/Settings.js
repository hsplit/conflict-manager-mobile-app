import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

class Settings extends React.PureComponent {
  state = {
    api: this.props.api,
    token: this.props.token,
  }

  componentWillUnmount () {
    this.props.setApi(this.state.api, this.state.token)
  }

  render () {
    return (
      <View style={styles.root}>
        <Text style={styles.label}>Api:</Text>
        <TextInput
          style={styles.input}
          onChangeText={api => this.setState({ api })}
          value={this.state.api}
        />
        <Text style={styles.label}>Token:</Text>
        <TextInput
          style={styles.input}
          onChangeText={token => this.setState({ token })}
          value={this.state.token}
        />
      </View>
    )
  }
}

export default Settings

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  label: {
    width: '100%',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 10,
  },
})
