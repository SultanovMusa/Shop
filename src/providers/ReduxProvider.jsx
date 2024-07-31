"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Notification from "@/components/Natification";

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <Notification>{children}</Notification>
    </Provider>
  );
}
