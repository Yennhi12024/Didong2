import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Dữ liệu cứng cho sản phẩm
  const [products, setProducts] = useState([
    { id: '1', name: 'Sản phẩm 1', price: '100.000 VND', image: 'https://product.hstatic.net/1000290074/product/956001241-0_e359808528594d99977ef1dd6e83e850_medium.jpg' },
    { id: '2', name: 'Sản phẩm 2', price: '200.000 VND', image: 'https://product.hstatic.net/1000290074/product/51000124-0_ea0d9e5e18054335ad0a65f52ceefa7e_medium.jpg' },
    { id: '3', name: 'Sản phẩm 3', price: '300.000 VND', image: 'https://product.hstatic.net/1000290074/product/93736000-7_f212f804ed824f5c8039031cde5ca1af_medium.jpg' },
    { id: '4', name: 'Sản phẩm 4', price: '400.000 VND', image: 'https://product.hstatic.net/1000290074/product/93728000-1_50def527a9ac43c59d91f78570a6dccc_medium.jpg' },
    { id: '5', name: 'Sản phẩm 5', price: '500.000 VND', image: 'https://product.hstatic.net/1000290074/product/9600112400211_7eb2483588ca4d88939e33162936eaf5_medium.jpg' },
  ]);

  const categories = [
    { id: '1', name: 'Tất cả' },
    { id: '2', name: 'Đồ nam' },
    { id: '3', name: 'Đồ nữ' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2;
  const numColumns = 2;

  return (
    <View style={styles.container}>
      {/* Logo và Ô tìm kiếm */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.cartIconContainer}>
          <Link href="./cart">
            <Icon name="shopping-cart" size={24} color="#fff" />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require('@/assets/images/banner1.jpg')} style={styles.banner} />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity key={category.id} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        key={numColumns}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={[styles.productContainer, { width: itemWidth }]}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Link href='./detail'>
              <Text style={styles.productName}>{item.name}</Text>
              </Link>
              <Text style={styles.productPrice}>{item.price}</Text>
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Mua ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartIcon}>
                  <Icon name="shopping-cart" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Không tìm thấy sản phẩm</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  cartIconContainer: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: '#F68620', 
    borderRadius: 10,
  },
  bannerContainer: {
    marginBottom: 12,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#F68620', 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: 'white',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120, 
    borderRadius: 8,
    marginBottom: 8,
  },
  productDetails: {
    justifyContent: 'center',
    padding: 8, 
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 8,
    color: '#F68620',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buyButton: {
    height: 35,
    backgroundColor: '#F68620', 
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartIcon: {
    padding: 6,
    backgroundColor: '#F68620',
    borderRadius: 5,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});
