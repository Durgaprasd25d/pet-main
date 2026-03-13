import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  FlatList,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useStoreStore } from '../../store/useStoreStore';

const CartScreen = ({ navigation }: any) => {
  const { cart, removeFromCart, updateCartQuantity } = useStoreStore();
  
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = totalPrice > 50 ? 0 : 5;

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.productId)}>
            <MaterialDesignIcons name="close" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <View style={styles.qtyContainer}>
          <TouchableOpacity 
            style={styles.qtyBtn}
            onPress={() => updateCartQuantity(item.productId, item.quantity - 1)}
          >
            <MaterialDesignIcons name="minus" size={16} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.qtyBtn}
            onPress={() => updateCartQuantity(item.productId, item.quantity + 1)}
          >
            <MaterialDesignIcons name="plus" size={16} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialDesignIcons name="chevron-left" size={32} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 44 }} />
      </View>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.productId}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{(totalPrice + deliveryFee).toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <MaterialDesignIcons name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBg}>
            <MaterialDesignIcons name="cart-off" size={64} color="#059669" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Looks like you haven't added anything to your cart yet.</Text>
          <TouchableOpacity 
            style={styles.shopBtn}
            onPress={() => navigation.navigate('StoreHome')}
          >
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  listContainer: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: 'Outfit-Black',
    color: '#059669',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  qtyText: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginHorizontal: 15,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 22,
    fontFamily: 'Outfit-Black',
    color: '#059669',
  },
  checkoutBtn: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    gap: 10,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconBg: {
    width: 120,
    height: 120,
    backgroundColor: '#eff6ff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  emptySub: {
    fontSize: 15,
    fontFamily: 'Outfit-Medium',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  shopBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 18,
  },
  shopBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
});

export default CartScreen;
