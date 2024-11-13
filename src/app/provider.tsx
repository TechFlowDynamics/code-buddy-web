"use client";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import React from "react";

import { AuthProvider } from "@/hooks/AuthContext";
import { HistoryProvider } from "@/hooks/HistoryContext";
import { ThemeProvider } from "@/hooks/ThemeContext";
import { SnackbarUtilsConfigurator } from "@/hooks/useSnackbar";

import { TOP_RIGHT } from "@/core/constants/snackbar.constant";

import {
  ErrorMessage,
  InfoMessage,
  SuccessMessage,
  WarningMessage,
} from "@/components/molecule/snackbar/snackbar";

import Navbar from "../components/molecule/navbar/ClientNavbar";
import { persistor, store } from "../store/store";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HistoryProvider>
              <SnackbarProvider
                preventDuplicate
                anchorOrigin={TOP_RIGHT}
                Components={{
                  success: SuccessMessage,
                  error: ErrorMessage,
                  warning: WarningMessage,
                  info: InfoMessage,
                }}
                maxSnack={3}
                autoHideDuration={2000}>
                <AuthProvider>
                  <ThemeProvider>
                    <MantineProvider>
                      <SnackbarUtilsConfigurator />
                      <Navbar />
                      <main>{children}</main>
                    </MantineProvider>
                  </ThemeProvider>
                </AuthProvider>
              </SnackbarProvider>
            </HistoryProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
