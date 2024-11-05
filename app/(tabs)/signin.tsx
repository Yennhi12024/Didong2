import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Trạng thái đăng ký
  const router = useRouter();
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost/mobile-backend/public/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Đăng ký thành công"); // Hiển thị thông báo thành công
        router.push("../(tabs)/signup");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to register");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Đăng Ký </Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        keyboardType="default"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#aaa"
      />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng kí</Text>
      </TouchableOpacity>


      {/* Hiển thị thông báo */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.loginRedirect}>
        <Link href="../(tabs)/signup">
          <Text style={styles.loginText}>Bạn đã có tài khoản? Đăng nhập</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'whitesmoke',
  },
  logo: {
    width: 200, 
    height: 200,
    alignSelf: 'center',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
    top: -15,
    textAlign: 'center',
    marginBottom: 16,
    color: '#F68620',
  },
  input: {
    height: 50,
    width: 300,
    alignSelf: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 19,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    height: 50,
    backgroundColor: '#F68620',
    borderRadius: 8,
    width: 180,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  buttonText: {
    color: '#fff',
  
    fontSize: 18,
    fontWeight: '500',
  },
  loginRedirect: {
    alignItems: 'center',
  },
  loginText: {
    color: '#FFCC66',
    textAlign:'center',
    fontSize: 16,
    fontWeight: '500',
  },
});