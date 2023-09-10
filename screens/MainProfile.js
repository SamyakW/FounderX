import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

export default class Cofounder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      emailAddress: '',
      profilePicture: null,
      bio: '',
      experience: '',
      skills: '',
      availability: '',
      linkedInProfile: '',
      email: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid,
      buttonClicked: false,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Result', result.assets[0].uri);

    if (!result.cancelled) {
      this.setState({ profilePicture: result.assets[0].uri });
      this.uploadImage(result.assets[0].uri);
    }
  };

  uploadImage = async (imageUri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
      });

      await firebase
        .storage()
        .ref()
        .child('users/' + this.state.email)
        .put(blob);

      this.fetchImage();
    } catch (error) {
      console.log(error);
    }
  };

  fetchImage = async () => {
    try {
      const url = await firebase
        .storage()
        .ref()
        .child('users/' + this.state.email)
        .getDownloadURL();
      this.setState({ profilePicture: url });
    } catch (e) {
      console.log(e);
    }
  };

  saveDataToFirestore = () => {
    const {
      fullName,
      emailAddress,
      bio,
      skills,
      experience,
      availability,
      linkedInProfile,
      uid,
      userRef = firebase.firestore().collection('profiles'),
    } = this.state;

    if (
      fullName.trim() === '' ||
      emailAddress.trim() === '' ||
      bio.trim() === '' ||
      skills.trim() === '' ||
      experience.trim() === '' ||
      availability.trim() === '' ||
      linkedInProfile.trim() === ''
    ) {
      Alert.alert('Missing Information', 'Please fill in all mandatory fields.');
      return;
    }

    try {
      const userRef = firebase.firestore().collection('profiles');
      const docRef = userRef.add({
        fullName,
        emailAddress,
        profilePicture: this.state.profilePicture,
        bio,
        experience,
        skills,
        availability,
        linkedInProfile,
        uid,
      });

      console.log('Document written with ID: ', docRef.id);

      Alert.alert('Success', 'Profile saved successfully!', [
        { text: 'OK', onPress: () => {} },
      ]);
      this.setState({
        fullName: '',
        emailAddress: '',
        profilePicture: '',
        bio: '',
        experience: '',
        skills: '',
        availability: '',
        linkedInProfile: '',
      });
    } catch (error) {
      this.setState({ buttonClicked: true });
      console.error('Error adding document: ', error);
    }
  };

  renderTextInput = (label, stateKey) => {
    const { editing } = this.state;

    return editing ? (
      <TextInput
        style={styles.input}
        onChangeText={(value) => this.setState({ [stateKey]: value })}
        placeholder={label}
        value={this.state[stateKey]}
      />
    ) : (
      <Text>{this.state[stateKey]}</Text>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Header
              centerComponent={{
                text: 'Co-founder Profile',
                style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
              }}
              backgroundColor="#00ADB5"
            />

            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <Ionicons name="image" size={24} color="#070618" />
              </View>
              <TouchableOpacity
                onPress={this.pickImage}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: '#b0b0b0' }}>
                  Profile Picture
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <Ionicons name="person" size={24} color="#070618" />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(fullName) => this.setState({ fullName })}
                placeholder="Full Name"
                value={this.state.fullName}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <Ionicons name="mail-outline" size={24} color="#070618" />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(emailAddress) => this.setState({ emailAddress })}
                placeholder="Email"
                value={this.state.emailAddress}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(bio) => this.setState({ bio })}
                placeholder="Bio"
                value={this.state.bio}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(experience) => this.setState({ experience })}
                placeholder="Experience"
                value={this.state.experience}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(skills) => this.setState({ skills })}
                placeholder="Skills"
                value={this.state.skills}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(availability) => this.setState({ availability })}
                placeholder="Time Availability"
                value={this.state.availability}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(linkedInProfile) => this.setState({ linkedInProfile })}
                placeholder="LinkedIn Profile"
                value={this.state.linkedInProfile}
              />
            </View>            

            {this.state.buttonClicked ? null : (
              <TouchableOpacity onPress={this.saveDataToFirestore} style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Save Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 15,
    alignSelf: 'center',
    marginBottom: 10,
    width: '90%',
    height: 50,
    borderColor: '#b0b0b0',
    borderRadius: 5,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    color: '#000',
  },
  updateButton: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#00ADB5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
