export interface Category {
    id: number;
    name: string;
    description: string;
  }

export interface Product {
    productId: number;
    productName: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    specialPrice: number;
    category: Category;
}

export type Products = Pick<Product, "productId" | 'productName' | 'description' | 'category' | 'discount' | 'image' | 'price' | 'quantity' | 'specialPrice'>[];

export type RootStackParamList = {
    Feed: undefined;
    Details: {
      coffee?: Product;
      id?: number
    };
    Carts: undefined;
    "/details/[id]": {
        id: number
    }
};

export interface DetailsScreenProps {
    route: RouteProp<RootStackParamList, 'Details'>;
    navigation: NativeStackNavigationProp<RootStackParamList>;
}
     