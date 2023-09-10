import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
export default class LoadingScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Tabs');
      } else {
        this.props.navigation.navigate('GetStarted');
      }
    });
  }

  render() {
    return (
      <LinearGradient
        colors={['#070618', '#00ADB5']}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 25,
    color: '#070618',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
