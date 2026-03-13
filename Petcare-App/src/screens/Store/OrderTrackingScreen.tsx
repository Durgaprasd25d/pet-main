import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useStoreStore } from '../../store/useStoreStore';
import { useAppStore } from '../../store/useAppStore';
import { dataService } from '../../services/dataService';

const OrderTrackingScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params;
  const { token } = useAppStore();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await dataService.getOrderById(orderId, token!);
      setOrder(data);
    } catch (err) {
      console.error("Failed to fetch order details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrderDetails, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  const getStepStatus = (step: string) => {
    const statusOrder = ['placed', 'confirmed', 'out_for_delivery', 'delivered'];
    const currentIdx = statusOrder.indexOf(order?.status);
    const stepIdx = statusOrder.indexOf(step);

    if (order?.status === 'cancelled') return 'cancelled';
    if (currentIdx >= stepIdx) return 'completed';
    if (currentIdx + 1 === stepIdx) return 'current';
    return 'pending';
  };

  const renderStep = (title: string, sub: string, status: string, icon: string, isLast = false) => {
    let color = '#94a3b8';
    let bgColor = '#f1f5f9';
    let iconColor = '#94a3b8';

    if (status === 'completed') {
      color = '#10b981';
      bgColor = '#ecfdf5';
      iconColor = '#10b981';
    } else if (status === 'current') {
      color = '#059669';
      bgColor = '#f5f7ff';
      iconColor = '#059669';
    } else if (status === 'cancelled') {
        color = '#ef4444';
        bgColor = '#fef2f2';
        iconColor = '#ef4444';
    }

    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepLeft}>
          <View style={[styles.stepIcon, { backgroundColor: bgColor }]}>
            <MaterialDesignIcons name={icon as any} size={22} color={iconColor} />
          </View>
          {!isLast && <View style={[styles.stepLine, status === 'completed' && { backgroundColor: '#10b981' }]} />}
        </View>
        <View style={styles.stepContent}>
          <Text style={[styles.stepTitle, { color: status === 'pending' ? '#94a3b8' : '#1e293b' }]}>{title}</Text>
          <Text style={styles.stepSub}>{sub}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('StoreHome')}>
          <MaterialDesignIcons name="close" size={28} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchOrderDetails}>
          <MaterialDesignIcons name="refresh" size={24} color="#059669" />
        </TouchableOpacity>
      </View>

      {loading && !order ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#059669" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.orderIdCard}>
            <Text style={styles.orderLabel}>Order ID</Text>
            <Text style={styles.orderValue}>#{order?._id.toUpperCase()}</Text>
            <View style={[styles.statusBadge, order?.status === 'cancelled' && { backgroundColor: '#fef2f2' }]}>
               <Text style={[styles.statusText, order?.status === 'cancelled' && { color: '#ef4444' }]}>
                 {order?.status.replace('_', ' ').toUpperCase()}
               </Text>
            </View>
          </View>

          <View style={styles.trackingCard}>
            {order?.status === 'cancelled' ? (
               renderStep('Cancelled', 'Your order was cancelled', 'cancelled', 'close-circle', true)
            ) : (
              <>
                {renderStep('Order Placed', 'We have received your order', getStepStatus('placed'), 'receipt')}
                {renderStep('Confirmed', 'Store is preparing your order', getStepStatus('confirmed'), 'store-check')}
                {renderStep('On the way', 'Your order is out for delivery', getStepStatus('out_for_delivery'), 'truck-delivery')}
                {renderStep('Delivered', 'Enjoy your purchase!', getStepStatus('delivered'), 'package-variant-closed', true)}
              </>
            )}
          </View>

          <View style={styles.section}>
             <Text style={styles.sectionTitle}>Order Items</Text>
             {order?.items.map((item: any, idx: number) => (
                <View key={idx} style={styles.itemRow}>
                   <Image source={{ uri: item.image }} style={styles.itemImage} />
                   <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                   </View>
                   <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                </View>
             ))}
          </View>

          <View style={styles.addressCard}>
             <Text style={styles.sectionTitle}>Delivery Address</Text>
             <View style={styles.addressRow}>
                <MaterialDesignIcons name="map-marker" size={20} color="#64748b" />
                <Text style={styles.addressText}>{order?.address}</Text>
             </View>
          </View>
        </ScrollView>
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
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  refreshBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  orderIdCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  orderLabel: {
    fontSize: 12,
    fontFamily: 'Outfit-Bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  orderValue: {
    fontSize: 16,
    fontFamily: 'Outfit-Black',
    color: '#1e293b',
    marginBottom: 15,
  },
  statusBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Outfit-Black',
    color: '#059669',
  },
  trackingCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  stepContainer: {
    flexDirection: 'row',
    height: 80,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  stepSub: {
    fontSize: 13,
    fontFamily: 'Outfit-Medium',
    color: '#94a3b8',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#334155',
  },
  itemQty: {
    fontSize: 12,
    fontFamily: 'Outfit-Medium',
    color: '#94a3b8',
  },
  itemPrice: {
    fontSize: 15,
    fontFamily: 'Outfit-Bold',
    color: '#1e293b',
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
    color: '#64748b',
    flex: 1,
    marginLeft: 10,
    lineHeight: 20,
  },
});

export default OrderTrackingScreen;
