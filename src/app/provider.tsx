"use client";
import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ThemeProvider } from "@/hooks/ThemeContext";
import Navbar from "../components/molecule/navbar/ClientNavbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { SnackbarProvider } from "notistack";
import {
  ErrorMessage,
  InfoMessage,
  SuccessMessage,
  WarningMessage,
} from "@/components/molecule/snackbar/snackbar";
import { AuthProvider } from "@/hooks/AuthContext";

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
      <body className={`antialiased`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <ThemeProvider>
                <MantineProvider>
                  <SnackbarProvider
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    Components={{
                      success: SuccessMessage,
                      error: ErrorMessage,
                      warning: WarningMessage,
                      info: InfoMessage,
                    }}
                    maxSnack={3}
                    autoHideDuration={2000}>
                    <Navbar />
                    <main>{children}</main>
                  </SnackbarProvider>
                </MantineProvider>
              </ThemeProvider>
            </AuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
