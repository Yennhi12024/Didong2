import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { fetchProducts } from "./../api/products";
import { router } from "expo-router";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / numColumns - 24;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts && Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error("Products data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  return (
    <FlatList
      data={products}
      key={numColumns}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/product-detail/[id]",
              params: { id: item.id },
            })
          }
          key={item.id}
          style={styles.productCard}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `http://localhost/mobile-backend/public/images/products/${item.image}`,
              }}
              style={styles.productImage}
            />
          </View>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price} đ</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Mua</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyMessage}>Không tìm thấy sản phẩm</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: itemWidth,
    margin: 8,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 130,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#F68620",
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: "#F68620",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
});

export default ProductList;
