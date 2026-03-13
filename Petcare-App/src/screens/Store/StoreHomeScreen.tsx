import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useStoreStore } from '../../store/useStoreStore';

const categories_icons: { [key: string]: string } = {
  'Food': 'food-apple',
  'Toys': 'toy-brick',
  'Grooming': 'content-cut',
  'Health': 'medical-bag',
  'Accessories': 'dog-service',
  'Bedding': 'bed',
  'Training': 'whistle',
  'Other': 'dots-horizontal'
};

const StoreHomeScreen = ({ navigation }: any) => {
  const { products, categories, cart, fetchProducts, fetchCategories, loading } = useStoreStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.categoryCard} 
      onPress={() => navigation.navigate('ProductListing', { category: item })}
    >
      <View style={styles.categoryIconContainer}>
        <MaterialDesignIcons name={(categories_icons[item] || 'package') as any} size={32} color="#059669" />
      </View>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <View style={styles.productFooter}>
          <View style={styles.ratingContainer}>
            <MaterialDesignIcons name="star" size={14} color="#f59e0b" />
            <Text style={styles.ratingText}>{item.rating || '4.5'}</Text>
          </View>
          <Text style={styles.storeName} numberOfLines={1}>{item.storeId?.name || 'Pet Store'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pet Store</Text>
          <Text style={styles.headerSubtitle}>Everything your pet needs</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
            <MaterialDesignIcons name="cart-outline" size={28} color="#1e293b" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.cartButton, { marginLeft: 10 }]} 
            onPress={() => navigation.navigate('MyOrders')}
          >
            <MaterialDesignIcons name="package-variant-closed" size={26} color="#059669" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <MaterialDesignIcons name="magnify" size={24} color="#94a3b8" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search for food, toys, etc." 
            style={styles.searchInput}
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProductListing')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#059669" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={products.slice(0, 6)}
              renderItem={renderProductItem}
              keyExtractor={(item) => item._id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.productsGrid}
              columnWrapperStyle={styles.productRow}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    color: '#64748b',
    marginTop: -2,
  },
  cartButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: '#1e293b',
  },
  section: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#059669',
  },
  categoriesList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryCard: {
    width: 90,
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryText: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: '#64748b',
    textAlign: 'center',
  },
  productsGrid: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 20,
    marginHorizontal: '1.5%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f8fafc',
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Outfit-Black',
    color: '#059669',
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Outfit-Bold',
    color: '#f59e0b',
    marginLeft: 3,
  },
  storeName: {
    fontSize: 11,
    fontFamily: 'Outfit-Medium',
    color: '#94a3b8',
    maxWidth: '60%',
  },
});

export default StoreHomeScreen;
