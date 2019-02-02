import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Conflict Manager</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#3384bb',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    width: '100%',
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
})
