import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'black'} size={'large'}  />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})