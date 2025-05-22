"use client";

import AuthState from "@/utils/AuthState";
import CartState from "@/utils/CartState";
import ChatState from "@/utils/ChatState";
import CompareState from "@/utils/CompareState";
import CompareMaterialState from "@/utils/CompareMaterialState";
import { SearchProvider } from "@/utils/SearchProvider";

import { SocketContextProvider } from "@/utils/SocketContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchProvider>
      <CompareMaterialState>
        <CompareState>
          <CartState>
            <AuthState>
              <ChatState>
                <SocketContextProvider>{children}</SocketContextProvider>
              </ChatState>
            </AuthState>
          </CartState>
        </CompareState>
      </CompareMaterialState>
    </SearchProvider>
  );
};
