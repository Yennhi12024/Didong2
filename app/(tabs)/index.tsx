import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Slider from "../screens/Slider";
import Product from "../screens/Product";
import Categories from "../screens/Category";

const { width } = Dimensions.get("window");
// Kiểu cho sản phẩm
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function HomeScreen() {
  const [likedProducts, setLikedProducts] = useState<{
    [key: number]: boolean;
  }>({});
  const router = useRouter();
  const toggleLike = (productId: number) => {
    setLikedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/search")}
          style={styles.searchContainer}
        >
          <TextInput
            style={styles.searchBar}
            placeholder="Tìm kiếm sản phẩm"
            placeholderTextColor="#aaa"
          />
          <Ionicons
            name="search"
            size={18}
            color="#fff"
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#06213e" />
        </TouchableOpacity>
      </View>
      <Slider />
      <Categories />

      <Product />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 65,
    top: 10,
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: "row",
    width: 240,
    alignItems: "center",
    borderColor: "#ddd",
    top: 10,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 8,
  },
  cartButton: {
    backgroundColor:"#F68620",
    top: 10,
    marginLeft: 8,
  },
});
