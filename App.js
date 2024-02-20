import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

//load component

import StackNav from "./src/navigation/stack";
import { PaperProvider } from "react-native-paper";
import { getAuthStorage } from "./src/components/localStorage";

import { CredentialContext } from "./src/components/context/credential";
import { useCallback, useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";
import { persistor, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [storedCredentials, setStoredCredentials] = useState({});

    const checkLoginCredentials = async () => {
        try {
            const auth = await getAuthStorage();
            setStoredCredentials(auth);
        } catch (err) {
            console.error(err);
        } finally {
            setAppIsReady(true);
        }
    };

    useEffect(() => {
        checkLoginCredentials();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <SafeAreaProvider onLayout={onLayoutRootView}>
                        <CredentialContext.Provider
                            value={{
                                storedCredentials,
                                setStoredCredentials,
                            }}
                        >
                            <NavigationContainer>
                                <StackNav />
                            </NavigationContainer>
                        </CredentialContext.Provider>
                        <StatusBar barStyle={"light-content"}  backgroundColor={"black"}/>
                    </SafeAreaProvider>
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
}
