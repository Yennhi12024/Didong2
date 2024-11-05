import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const cartItems = [
  { id: 1, name: 'Sản phẩm 1', image: 'https://product.hstatic.net/1000290074/product/960021240-0_726ad45e9c4b47c3907c206e71074fe3_medium.jpg', price: 200000, quantity: 1, selected: false },
  { id: 2, name: 'Sản phẩm 2', image: 'https://product.hstatic.net/1000290074/product/9600112400211_7eb2483588ca4d88939e33162936eaf5_medium.jpg', price: 700000, quantity: 1, selected: false },
];

export default function CartScreen() {
  const [items, setItems] = useState(cartItems);

  const increaseQuantity = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id: number) => {
    setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const toggleSelectItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (item.selected) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Link href="./home">
            <Ionicons name="arrow-back" size={30} color="#333" />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={28} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <View style={styles.cartItemsContainer}>
        {items.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <TouchableOpacity onPress={() => toggleSelectItem(item.id)} style={styles.customCheckBox}>
              {item.selected ? (
                <Ionicons name="checkmark-circle" size={26} color="#34A853" />
              ) : (
                <Ionicons name="ellipse-outline" size={26} color="#ccc" />
              )}
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <View style={styles.cartItemQuantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cartItemPrice}>{item.price.toLocaleString()} VND</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng cho sản phẩm đã chọn:</Text>
        <Text style={styles.totalPrice}>{calculateTotal().toLocaleString()} VND</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemsContainer: {
    marginBottom: 25,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 18,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  customCheckBox: {
    marginRight: 12,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cartItemQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 110,
    justifyContent: 'space-between',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
  },
  quantityButtonText: {
    color: '#000',
    fontSize: 20,
  },
  cartItemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34A853',
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
