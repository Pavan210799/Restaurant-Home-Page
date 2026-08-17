import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'tastenest-cart';

function readStoredItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item.label === 'string')
      .map((item) => ({
        label: item.label,
        price: typeof item.price === 'string' ? item.price : '',
        image: typeof item.image === 'string' ? item.image : '',
        qty: Number.isFinite(item.qty) && item.qty > 0 ? item.qty : 1,
      }));
  } catch {
    return [];
  }
}

function priceToNumber(price) {
  const n = Number.parseFloat(String(price).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredItems);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private mode */
    }
  }, [items]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const showToast = useCallback((text) => {
    setToast({ id: Date.now(), text });
  }, []);

  const addToCart = useCallback((item) => {
    const label = typeof item === 'string' ? item : item?.label;
    if (!label) return;

    const price = typeof item === 'object' && item.price ? item.price : '';
    const image = typeof item === 'object' && item.image ? item.image : '';

    setItems((prev) => {
      const index = prev.findIndex((entry) => entry.label === label);
      if (index === -1) {
        return [...prev, { label, price, image, qty: 1 }];
      }
      const next = [...prev];
      next[index] = { ...next[index], qty: next[index].qty + 1 };
      return next;
    });

    setToast({ id: Date.now(), text: `Added to bag: ${label}` });
  }, []);

  const placeOrder = useCallback(() => {
    setItems([]);
    setToast({ id: Date.now(), text: 'Order placed! The kitchen is on it.' });
  }, []);

  const removeItem = useCallback((label) => {
    setItems((prev) => prev.filter((entry) => entry.label !== label));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + priceToNumber(item.price) * item.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, total, addToCart, removeItem, clearCart, placeOrder, showToast }),
    [items, count, total, addToCart, removeItem, clearCart, placeOrder, showToast],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="cart-toast" role="status" aria-live="polite">
          {toast.text}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
