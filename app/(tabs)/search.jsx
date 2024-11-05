import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchSearchProducts } from "../api/products";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      setIsLoading(true);
      const results = await fetchSearchProducts(term);
      setFilteredData(results);
      setIsLoading(false);
    } else {
      setFilteredData([]);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/product-detail/[id]",
          params: { id: item.id },
        })
      }
      key={item.id}
      style={styles.item}
    >
      <Image
        source={{
          uri: `http://localhost/mobile-backend/public/images/products/${item.image}`,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemPrice}>$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  useFocusEffect(
    React.useCallback(() => {
      resetSearch();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Fashion!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Find your fashion style..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fb",
  },
  title: {
    paddingBottom: 15,
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f3b63",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    height: 45,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  loader: {
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#4a90e2",
  },
});
