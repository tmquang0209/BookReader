import { useCallback } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

//load component
import store from "./src/store";
import { fontsList } from "./src/constants/fonts";

import StackNav from "./src/navigation/stack";

export default function App() {
    //load font
    const [fontsLoaded] = useFonts(fontsList);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StackNav />
                </NavigationContainer>
                <StatusBar animated barStyle={"light-content"} />
            </SafeAreaProvider>
        </Provider>
    );
}
