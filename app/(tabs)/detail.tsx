import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Example product image URL
const productImage = 'https://product.hstatic.net/1000290074/product/93728000-1_50def527a9ac43c59d91f78570a6dccc_medium.jpg';

// Define product type
interface Product {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function ProductDetailScreen() {
  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [cart, setCart] = useState<Product[]>([]); // Explicitly typing cart as an array of Product objects

  // Dummy size options
  const sizeOptions = ['S', 'M', 'L', 'XL'];

  // Handle adding to cart
  const handleAddToCart = () => {
    const product: Product = {
      id: 1,
      name: 'Tên Sản Phẩm',
      price: 123,
      size: selectedSize,
      quantity: quantity,
      image: productImage,
    };

    setCart([...cart, product]); 
    Alert.alert('Thành công', `Sản phẩm đã được thêm vào giỏ hàng với số lượng ${quantity} và kích cỡ ${selectedSize}`);
  };
  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity>
          <Ionicons name="cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: productImage }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Details */}
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>Tên Sản Phẩm</Text>
        <Text style={styles.productDescription}>
          Mô tả chi tiết sản phẩm sẽ được hiển thị ở đây. Đầy đủ thông tin về sản phẩm, chất liệu, nguồn gốc xuất xứ, và các đặc điểm nổi bật.
        </Text>

        {/* Size Selection */}
        <Text style={styles.sizeTitle}>Chọn kích cỡ:</Text>
        <View style={styles.sizeOptionsContainer}>
          {sizeOptions.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton, 
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={selectedSize === size ? styles.selectedSizeText : styles.sizeText}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity Selection */}
        <Text style={styles.quantityTitle}>Số lượng:</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange('decrease')}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange('increase')}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.productPrice}>$123</Text>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Related Products */}
      <View style={styles.relatedProductsContainer}>
        <Text style={styles.relatedProductsTitle}>Sản Phẩm Liên Quan</Text>
        <View style={styles.productRow}>
          <View style={styles.productItem}>
            <Image
              source={{ uri: 'https://product.hstatic.net/1000290074/product/92872-1_ef448b75db5d494e9ec12fddaf6d6744_medium.jpg' }}
              style={styles.relatedProductImage}
            />
            <Text style={styles.productName}>Product 1</Text>
            <Text style={styles.productPrice}>$123</Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Mua</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productItem}>
            <Image
              source={{ uri:'https://product.hstatic.net/1000290074/product/92872-1_ef448b75db5d494e9ec12fddaf6d6744_medium.jpg' }}
              style={styles.relatedProductImage}
            />
            <Text style={styles.productName}>Product 2</Text>
            <Text style={styles.productPrice}>$456</Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Mua</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'lightgray',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 250,
  },
  productDetailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sizeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#F68620', 
    borderColor: '#F68620',
  },
  sizeText: {
    fontSize: 16,
    color: '#333',
  },
  selectedSizeText: {
    fontSize: 16,
    color: '#fff',
  },
  quantityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#F68620', 
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  relatedProductsContainer: {
    marginBottom: 20,
  },
  relatedProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  relatedProductImage: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
});
