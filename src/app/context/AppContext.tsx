import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "preparing" | "delivered";
  date: string;
  address: string;
}

interface AppContextType {
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => void;
  register: (
    name: string,
    email: string,
    password: string,
  ) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (address: string, paymentMethod: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(
  undefined,
);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      items: [
        {
          id: "1",
          name: "Pav Bhaji",
          description:
            "Mumbai special mashed vegetables with butter pav",
          price: 120,
          image:
            "https://images.unsplash.com/photo-1554978991-33ef7f31d658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXYlMjBiaGFqaSUyMG11bWJhaXxlbnwxfHx8fDE3NzAzODkzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          category: "Bombay Special",
          rating: 4.8,
          quantity: 2,
        },
      ],
      total: 240,
      status: "delivered",
      date: "2026-02-01",
      address: "123 Main St, Apt 4B",
    },
  ]);

  const login = (email: string, password: string) => {
    // Mock login
    setUser({ name: "John Doe", email });
  };

  const register = (
    name: string,
    email: string,
    password: string,
  ) => {
    // Mock register
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (
    address: string,
    paymentMethod: string,
  ) => {
    if (cart.length === 0) return;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart,
      total,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      address,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};