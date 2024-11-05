import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function IntroScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(tabs)/signup");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://your-image-url.com/intro-background.jpg" }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Chào mừng đến với CapyShop</Text>
        <Text style={styles.description}>
          Khám phá những sản phẩm tuyệt vời và nhận ưu đãi đặc biệt!
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={handlePress}>
          <Text style={styles.startButtonText}>Bắt Đầu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#555555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  startButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
