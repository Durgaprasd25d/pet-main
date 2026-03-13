import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useStoreStore } from '../../store/useStoreStore';
import { useAppStore } from '../../store/useAppStore';

const CheckoutScreen = ({ navigation }: any) => {
  const { cart, clearCart, placeOrder } = useStoreStore();
  const { user, token } = useAppStore();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = totalPrice + deliveryFee;

  const handleConfirmOrder = async () => {
    if (!address || !phone) {
      Alert.alert('Error', 'Please provide delivery address and contact number');
      return;
    }

    try {
      const orderData = {
        items: cart,
        totalPrice: finalTotal,
        address,
        phone,
        paymentMethod
      };
      
      const order = await placeOrder(orderData, token!);
      clearCart();
      Alert.alert('Success', 'Your order has been placed successfully!', [
        { text: 'Track Order', onPress: () => navigation.navigate('OrderTracking', { orderId: order._id }) }
      ]);
    } catch (error: any) {
      Alert.alert('Order Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialDesignIcons name="chevron-left" size={32} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Information</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput 
                value={user?.name} 
                editable={false}
                style={[styles.input, styles.disabledInput]} 
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput 
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                style={styles.input} 
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Delivery Address</Text>
              <TextInput 
                value={address}
                onChangeText={setAddress}
                placeholder="Enter full address"
                multiline
                numberOfLines={3}
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity 
              style={[styles.methodCard, paymentMethod === 'cash_on_delivery' && styles.selectedMethod]}
              onPress={() => setPaymentMethod('cash_on_delivery')}
            >
              <MaterialDesignIcons 
                name={paymentMethod === 'cash_on_delivery' ? 'radiobox-marked' : 'radiobox-blank'} 
                size={24} 
                color={paymentMethod === 'cash_on_delivery' ? '#059669' : '#94a3b8'} 
              />
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>Cash on Delivery</Text>
                <Text style={styles.methodSub}>Pay when you receive items</Text>
              </View>
              <MaterialDesignIcons name="cash" size={24} color="#64748b" />
            </TouchableOpacity>

            {/* <TouchableOpacity 
              style={[styles.methodCard, paymentMethod === 'card' && styles.selectedMethod, { opacity: 0.6 }]}
              onPress={() => Alert.alert('Notice', 'Card payments are coming soon!')}
            >
              <MaterialDesignIcons 
                name="radiobox-blank" 
                size={24} 
                color="#94a3b8" 
              />
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>Credit/Debit Card</Text>
                <Text style={styles.methodSub}>Secure online payment</Text>
              </View>
              <MaterialDesignIcons name="credit-card" size={24} color="#64748b" />
            </TouchableOpacity> */}
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
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
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
          <Text style={styles.confirmBtnText}>Confirm Order</Text>
          <MaterialDesignIcons name="check-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#64748b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  disabledInput: {
    color: '#94a3b8',
    backgroundColor: '#f1f5f9',
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f1f5f9',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  selectedMethod: {
    borderColor: '#059669',
    backgroundColor: '#f5f7ff',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  methodName: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  methodSub: {
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
    color: '#94a3b8',
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 15,
    fontFamily: 'Outfit-Medium',
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 15,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Outfit-Black',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 22,
    fontFamily: 'Outfit-Black',
    color: '#059669',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  confirmBtn: {
    backgroundColor: '#059669',
    height: 60,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
  },
});

export default CheckoutScreen;
