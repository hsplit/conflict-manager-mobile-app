import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

const renderError = error => (<Text style={styles.error}>Error: {error}</Text>)

const renderMyFiles = files => {
  const filesToGroups = files => {
    let groups = {
      new: [],
      modified: [],
      renamed: [],
      typechange: [],
      ignored: [],
    }

    files.forEach(({ path, statuses }) => {
      switch (true) {
        case statuses.new:
          groups.new.push(path)
          break
        case statuses.modified:
          groups.modified.push(path)
          break
        case statuses.renamed:
          groups.renamed.push(path)
          break
        case statuses.typechange:
          groups.typechange.push(path)
          break
        case statuses.ignored:
          groups.ignored.push(path)
      }
    })

    return groups
  }

  const groups = filesToGroups(files)

  const getChilds = (key, data) => data.length ? (
    <>
      <Text style={styles.group}>{key}</Text>
      <View style={styles.items}>
        {
          data.map(el => <Text style={styles.item}>{el}</Text>)
        }
      </View>
    </>
  ) : null

  return (
    <>
      {getChilds('New', groups.new)}
      {getChilds('Modified', groups.modified)}
      {getChilds('Renamed', groups.renamed)}
      {getChilds('Typechange', groups.typechange)}
      {getChilds('Ignored', groups.ignored)}
    </>
  )
}

const renderConflicts = conflicts => conflicts.map(({ userName, files }) => (
  <>
    <Text style={styles.group}>{userName}</Text>
    <View style={styles.items}>
      {
        files.map(el => <Text style={styles.item}>{el}</Text>)
      }
    </View>
  </>
))

const renderData = ({ myFiles = [], conflicts = {} }, connectionStatus) => {
  return (
    <>
      <View style={styles.files}>
        {
          myFiles.length
            ? (
              <>
                <Text style={styles.group}>My files:</Text>
                {renderMyFiles(myFiles)}
              </>
            )
            : <Text style={styles.group}>
              {
                connectionStatus === 'Connected'
                  ? 'Have no any changes in my files'
                  : 'Wait for connection'
              }
            </Text>
        }
      </View>
      <View>
        {
          conflicts.error ? renderError(conflicts.error) : conflicts.length
            ? (
              <>
                <Text style={styles.group}>Conflicts:</Text>
                {renderConflicts(conflicts)}
              </>
            )
            : <Text style={styles.group}>
              {
                connectionStatus === 'Connected'
                  ? 'Have no any conflicts'
                  : 'Wait for connection'
              }
            </Text>
        }
      </View>
    </>
  )
}

const Home = ({ connectionStatus, data }) => {
  return (
    <View style={styles.root}>
      <View style={styles.connection}>
        <Text style={styles.status}>Connection status: { connectionStatus }</Text>
        <Text style={styles.update}>Last update: {data.lastUpdate || 'never updated'}</Text>
      </View>
      <View style={styles.conflicts}>
        <ScrollView>
          <View style={styles.wrapper}>
            { data.error ? renderError(data.error) : renderData(data, connectionStatus) }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  connection: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  status: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  conflicts: {
    flex: 7,
    width: '100%',
  },
  files: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    paddingBottom: 10,
    marginBottom: 10,
  },
  wrapper: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  update: {
    color: '#ffffff',
    fontSize: 20,
  },
  error: {
    fontSize: 25,
    color: '#b71431',
  },
  group: {
    color: '#ffffff',
    fontSize: 20,
    fontStyle: 'italic',
  },
  items: {
    paddingLeft: 20,
  },
  item: {
    color: '#ffffff',
    fontSize: 18,
  },
})
