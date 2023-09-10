import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

export default function CofounderDetails({ route, navigation }) {
  const cofounder = route.params.cofounder;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: cofounder.fullName,
          style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
        }}
        backgroundColor="#00ADB5">
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>
      </Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: cofounder.photo }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <InfoItem label="Email" value={cofounder.emailAddress} />
          <InfoItem label="Bio" value={cofounder.bio} />
          <InfoItem label="Experience" value={cofounder.experience} />
          <InfoItem label="Skills" value={cofounder.skills} />
          <InfoItem label="Availability" value={cofounder.availability} />
          <InfoItem label="LinkedIn Profile" value={cofounder.linkedInProfile} />
        </View>
      </ScrollView>
    </View>
  );
}

const InfoItem = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.heading}>{label}:</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070618',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileInfo: {
    width: '80%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    color: '#00ADB5',
    fontWeight: 'bold',
    fontSize: 16,
    width: 120,
  },
  text: {
    color: '#fff',
    flex: 1,
  },
});
