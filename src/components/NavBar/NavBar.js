import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

import {
  HOME,
  SETTINGS,
} from '../../constants/routes'

const NavBar = ({ route, setRoute }) => {
  return (
    <View style={styles.navBar}>
      <Button
        disabled={route === HOME}
        onPress={() => setRoute(HOME)}
        title={HOME}
        color='#feca3a'
      />
      <Button
        disabled={route === SETTINGS}
        onPress={() => setRoute(SETTINGS)}
        title={SETTINGS}
        color='#feca3a'
      />
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#3384BB',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    width: '100%',
  },
})
