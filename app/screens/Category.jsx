import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import {fetchCategories} from "../api/Category"



const Categories = () => {
  const [categories, setCategories] = useState([]); // Khởi tạo banners là mảng rỗng
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        console.log(categories); // Kiểm tra phản hồi API
        if (categories) {
          setCategories(categories); // Kiểm tra xem data.categories có phải là mảng không
        } else {
          console.error("categories data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() =>
              router.push({
                pathname: "/"
              })
            } style={styles.button} >
            {/* onPress={handleSubmit} */}
            <Text style={styles.textButton}>Tất cả</Text>
          </TouchableOpacity>
        </View>
        {categories.map((category) => (
          <View key={category.id} style={styles.containerButton}>
            <TouchableOpacity style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]/productcategory",
                params: { id: category.id },
              })
            }
            >
              {/* onPress={handleSubmit} */}
              <Text style={styles.textButton}>{category.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  containerButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50,
    marginBottom: 10,
    alignItems: "center",
  },
  button: {
    margin: 5,
    backgroundColor: "#f57342",
    borderRadius: 10,
  },
  textButton: {
    color: "#fff",
    padding: 10,
  },
});