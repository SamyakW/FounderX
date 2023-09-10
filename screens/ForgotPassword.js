import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import { Feather } from '@expo/vector-icons';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  sendResetLink = () => {
    const { email } = this.state;

    if (email.trim() === '') {
      Alert.alert('Please enter your email.');
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Email for Password Reset sent!');
          this.props.navigation.replace('SignIn');
        })
        .catch((error) => {
          Alert.alert("Error!");
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/ForgotPassword.png')}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}
              >
                <Feather
                  name="chevron-left"
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>Forgot Password</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Enter your email"
                onChangeText={(email) => {
                  this.setState({ email });
                }}
                value={this.state.email.trim()}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={this.sendResetLink}>
              <Ionicon name="send" size={20} color="white" style={styles.icon} />              
              <Text style={styles.buttonText}>Send Link </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#070618',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#00ADB5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
});