"use client";

import { Provider } from "react-redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { store } from "@/store/store";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </Provider>
  );
}
