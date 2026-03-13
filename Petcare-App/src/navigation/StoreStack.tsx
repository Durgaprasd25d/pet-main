import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import StoreHomeScreen from '../screens/Store/StoreHomeScreen';
import ProductListingScreen from '../screens/Store/ProductListingScreen';
import ProductDetailsScreen from '../screens/Store/ProductDetailsScreen';
import CartScreen from '../screens/Store/CartScreen';
import CheckoutScreen from '../screens/Store/CheckoutScreen';
import OrderTrackingScreen from '../screens/Store/OrderTrackingScreen';
import { MyOrdersScreen } from '../screens/Store/MyOrdersScreen';

export type StoreStackParamList = {
  StoreHome: undefined;
  ProductListing: { category?: string };
  ProductDetails: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderTracking: { orderId: string };
  MyOrders: undefined;
};

const Stack = createNativeStackNavigator<StoreStackParamList>();

export const StoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StoreHome" component={StoreHomeScreen} />
      <Stack.Screen name="ProductListing" component={ProductListingScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
};
