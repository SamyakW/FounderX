import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { Ionicons } from 'react-native-vector-icons';

const AboutAppScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/About.png')}
      style={{ flex: 1, resizeMode: 'cover' }}
    >
      <Header
        centerComponent={{
          text: 'About FounderX',
          style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
        }}
        backgroundColor="#00ADB5"
        leftComponent={
          <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={goBack}>
            <Ionicons name="chevron-back-outline" size={24} color="white" />
          </TouchableOpacity>
        }
      />
    </ImageBackground>
  );
};

export default AboutAppScreen;