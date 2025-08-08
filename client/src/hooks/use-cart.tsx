import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from "react";
import { Product } from "@/lib/types";
import { 
  MINIMUM_ORDER_QUANTITY, 
  QUANTITY_INCREMENT, 
  roundToNearestIncrement,
  getNextValidQuantity 
} from "@/lib/constants";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("rsCart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse cart from localStorage");
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("rsCart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, quantity = MINIMUM_ORDER_QUANTITY) => {
    // Ensure quantity meets MOQ and increment requirements
    const validQuantity = roundToNearestIncrement(quantity);
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = roundToNearestIncrement(existingItem.quantity + validQuantity);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: validQuantity
        }];
      }
    });
  }, []);

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity < MINIMUM_ORDER_QUANTITY) {
      // If trying to go below MOQ, remove the item
      removeItem(productId);
      return;
    }

    // Round to nearest valid increment
    const validQuantity = roundToNearestIncrement(newQuantity);
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: validQuantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
