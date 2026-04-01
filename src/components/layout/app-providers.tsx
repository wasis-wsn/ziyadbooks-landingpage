"use client";

import type { ReactNode } from "react";

import { CartProvider } from "@/hooks/cart-context";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <CartProvider>{children}</CartProvider>;
}