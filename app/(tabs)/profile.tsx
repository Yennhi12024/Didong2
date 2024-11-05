import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // Dummy user data for demonstration purposes
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: 'https://your-image-url.com/user-profile.jpg',
  };

  const handleEditProfile = () => {
    // Navigation to edit profile screen can go here
    alert("Navigating to Edit Profile...");
  };

  const handleSettings = () => {
    // Navigation to settings screen can go here
    alert("Navigating to Settings...");
  };

  const handleLogout = () => {
    // Implement logout logic
    alert("Logging out...");
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />

      {/* User Info */}
      <Text style={styles.userName}>{userData.name}</Text>
      <Text style={styles.userEmail}>{userData.email}</Text>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
        <Ionicons name="person-outline" size={20} color="#FFF" />
        <Text style={styles.actionButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
        <Ionicons name="settings-outline" size={20} color="#FFF" />
        <Text style={styles.actionButtonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FFF" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 5,
    width: '100%',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4081',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 20,
    width: '100%',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
