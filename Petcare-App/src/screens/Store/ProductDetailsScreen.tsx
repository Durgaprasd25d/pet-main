import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useStoreStore } from '../../store/useStoreStore';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const { products, cart, addToCart } = useStoreStore();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p._id === productId);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // navigation.navigate('Cart'); // Optional: Don't navigate immediately to allow adding more
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <SafeAreaView style={styles.headerOverlay} edges={['top']}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
              <MaterialDesignIcons name="chevron-left" size={28} color="#1e293b" />
            </TouchableOpacity>
            <View style={styles.headerRightActions}>
              <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.navigate('Cart')}>
                <MaterialDesignIcons name="cart-outline" size={22} color="#1e293b" />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.circleBtn, { marginLeft: 10 }]} onPress={() => navigation.navigate('MyOrders')}>
                <MaterialDesignIcons name="package-variant-closed" size={20} color="#059669" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.circleBtn, { marginLeft: 10 }]}>
                <MaterialDesignIcons name="share-variant" size={22} color="#1e293b" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <View style={styles.infoSection}>
             <View style={styles.badgeRow}>
               <View style={styles.categoryBadge}>
                 <Text style={styles.categoryBadgeText}>{product.category}</Text>
               </View>
               <View style={styles.ratingBadge}>
                 <MaterialDesignIcons name="star" size={16} color="#f59e0b" />
                 <Text style={styles.ratingText}>{product.rating || '4.5'}</Text>
                 <Text style={styles.reviewsText}>(124 reviews)</Text>
               </View>
             </View>
             
             <Text style={styles.name}>{product.name}</Text>
             <Text style={styles.storeName}>Sold by {product.storeId?.name || 'PetCare Store'}</Text>
             
             <View style={styles.priceRow}>
               <Text style={styles.price}>₹{product.price}</Text>
               <View style={styles.quantityContainer}>
                 <TouchableOpacity 
                   style={styles.qtyBtn} 
                   onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                 >
                   <MaterialDesignIcons name="minus" size={20} color="#1e293b" />
                 </TouchableOpacity>
                 <Text style={styles.qtyText}>{quantity}</Text>
                 <TouchableOpacity 
                   style={styles.qtyBtn} 
                   onPress={() => setQuantity(quantity + 1)}
                 >
                   <MaterialDesignIcons name="plus" size={20} color="#1e293b" />
                 </TouchableOpacity>
               </View>
             </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery & Returns</Text>
            <View style={styles.featureItem}>
               <MaterialDesignIcons name="truck-delivery" size={22} color="#10b981" />
               <View style={styles.featureTextContainer}>
                 <Text style={styles.featureTitle}>Free Delivery</Text>
                 <Text style={styles.featureSub}>For orders over ₹50</Text>
               </View>
            </View>
            <View style={styles.featureItem}>
               <MaterialDesignIcons name="keyboard-return" size={22} color="#3b82f6" />
               <View style={styles.featureTextContainer}>
                 <Text style={styles.featureTitle}>7 Days Return</Text>
                 <Text style={styles.featureSub}>Easy returns and refunds</Text>
               </View>
            </View>
          </View>
          
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>₹{(product.price * quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buyBtn} onPress={handleAddToCart}>
          <MaterialDesignIcons name="basket-plus" size={20} color="#fff" />
          <Text style={styles.buyBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: '#f8fafc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBtn: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
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
    fontFamily: 'Outfit-Bold',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingTop: 30,
    paddingHorizontal: 25,
  },
  infoSection: {
    marginBottom: 0,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontFamily: 'Outfit-Bold',
    color: '#3b82f6',
    textTransform: 'uppercase',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
    color: '#94a3b8',
    marginLeft: 4,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  storeName: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#64748b',
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 32,
    fontFamily: 'Outfit-Black',
    color: '#059669',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    padding: 5,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  qtyText: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginHorizontal: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 25,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Outfit-Regular',
    color: '#64748b',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 18,
  },
  featureTextContainer: {
    marginLeft: 15,
  },
  featureTitle: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#334155',
  },
  featureSub: {
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
    color: '#94a3b8',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
    color: '#94a3b8',
  },
  totalValue: {
    fontSize: 24,
    fontFamily: 'Outfit-Black',
    color: '#1e293b',
  },
  buyBtn: {
    flex: 1.5,
    backgroundColor: '#059669',
    flexDirection: 'row',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  buyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
});

export default ProductDetailsScreen;
