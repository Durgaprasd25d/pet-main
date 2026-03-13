import { create } from 'zustand';
import { dataService } from '../services/dataService';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface StoreState {
  products: any[];
  categories: string[];
  cart: CartItem[];
  orders: any[];
  loading: boolean;
  error: string | null;
  
  fetchProducts: (params?: any) => Promise<void>;
  fetchCategories: () => Promise<void>;
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (orderData: any, token: string) => Promise<any>;
  fetchMyOrders: (token: string) => Promise<void>;
}

export const useStoreStore = create<StoreState>((set, get) => ({
  products: [],
  categories: [],
  cart: [],
  orders: [],
  loading: false,
  error: null,

  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const products = await dataService.getProducts(params);
      set({ products, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await dataService.getCategories();
      set({ categories });
    } catch (error: any) {
      console.error('Failed to fetch categories', error);
    }
  },

  addToCart: (product, quantity = 1) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.productId === product._id);

    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({
        cart: [
          ...cart,
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.image,
          },
        ],
      });
    }
  },

  removeFromCart: (productId) => {
    set({
      cart: get().cart.filter(item => item.productId !== productId),
    });
  },

  updateCartQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: get().cart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  placeOrder: async (orderData, token) => {
    set({ loading: true, error: null });
    try {
      const order = await dataService.createOrder(orderData, token);
      set({ loading: false });
      get().clearCart();
      return order;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchMyOrders: async (token) => {
    set({ loading: true, error: null });
    try {
      const orders = await dataService.getMyOrders(token);
      set({ orders, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
