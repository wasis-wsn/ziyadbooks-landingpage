"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { CatalogProduct } from "@/types/catalog";

const STORAGE_KEY = "ziyadbooks-cart";

interface CartItem {
  productId: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  slug: string;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: CatalogProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = globalThis.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      setItems([]);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hasHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return {
      items,
      totalItems,
      totalPrice,
      addToCart: (product) => {
        setItems((previous) => {
          const exists = previous.find((item) => item.productId === product.id);

          if (exists) {
            return previous.map((item) =>
              item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            );
          }

          return [
            ...previous,
            {
              productId: product.id,
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.finalPrice,
              quantity: 1,
              slug: product.slug,
            },
          ];
        });
      },
      removeFromCart: (productId) => {
        setItems((previous) => previous.filter((item) => item.productId !== productId));
      },
      increaseQuantity: (productId) => {
        setItems((previous) =>
          previous.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        );
      },
      decreaseQuantity: (productId) => {
        setItems((previous) =>
          previous
            .map((item) =>
              item.productId === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      clearCart: () => {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}