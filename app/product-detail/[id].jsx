import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchProductById } from "../api/products";
import { useRoute } from "@react-navigation/native";

export default function ProductDetails() {
  const route = useRoute();
  const { id } = route.params;
  const [item, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductById(id);
        if (data && data.product) {
          setProduct(data.product);
        } else {
          console.error("Product data structure mismatch");
        }
      } catch (error) {
        console.error("Error loading product details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" style={styles.loading} />;
  }

  if (!item) {
    return <Text style={styles.errorText}>Product not found</Text>;
  }

  const sizes = item.sizes || ['S', 'M', 'L', 'XL']; // Replace with actual size data if available

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image
          source={{ uri: `http://localhost/mobile-backend/public/images/products/${item.image}` }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        {/* Product Name and Price */}
        <View style={styles.header}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}₫</Text>
        </View>
        <View style={styles.sizeSelectionContainer}>
          <Text style={styles.sizeSelectionTitle}>Chọn kích thước:</Text>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton, // Highlight selected size
                ]}
                onPress={() => setSelectedSize(size)} // Update selected size
              >
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Rating and Stock */}
        <View style={styles.ratingAndStock}>
          <Text style={styles.ratingText}>Rating: {item.rating}⭐</Text>
          <Text style={styles.stockText}>Stock: {item.stock} items</Text>
        </View>
        
        {/* Product Description */}
        <Text style={styles.productDescription}>{item.description}</Text>

        {/* Static Product Features Section */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Thông số kỹ thuật:</Text>
          <Text style={styles.featureItem}>• Chất liệu: {item.material || 'Chưa có thông tin'}</Text>
          <Text style={styles.featureItem}>• Kích thước: {item.size || 'Chưa có thông tin'}</Text>
          <Text style={styles.featureItem}>• Màu sắc: {item.color || 'Chưa có thông tin'}</Text>
        </View>

        {/* Size Selection Section */}
       

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buttonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 15,
  },
  productName: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#333", 
    textAlign: "center" 
  },
  productPrice: { 
    fontSize: 20, 
    color: "#F68620", 
    fontWeight: "bold", 
    marginTop: 5 
  },
  ratingAndStock: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  ratingText: { fontSize: 16, color: "#666" },
  stockText: { fontSize: 16, color: "#666" },
  productDescription: {
    fontSize: 16,
    color: "#666",
    paddingHorizontal: 20,
    textAlign: "justify",
    marginVertical: 15,
  },
  scrollContainer: { padding: 10 },
  featuresContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  featureItem: {
    fontSize: 16,
    color: "#666",
  },
  sizeSelectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sizeSelectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  sizeOptions: {
    flexDirection: "row",
    marginTop: 10,
  },
  sizeButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  selectedSizeButton: {
    backgroundColor: "#4CAF50", // Change color for selected size
  },
  sizeText: { fontSize: 14, color: "#333" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 30,
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buyButton: {
    backgroundColor: "#F68620",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  errorText: { textAlign: "center", color: "#888", fontSize: 18, marginTop: 20 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" }, // Center loading indicator
});
