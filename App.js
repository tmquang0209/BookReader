import { useCallback } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

//load component
import store from "./src/store";
import { fontsList } from "./src/constants/fonts";
import BottomTabNav from "./src/components/bottomTabNav";

//load screen
import GetStarted from "./src/screen/GetStarted";

const Stack = createStackNavigator();

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
                    <Stack.Navigator>
                        <Stack.Group
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen
                                name="GetStarted"
                                component={GetStarted}
                            />
                        </Stack.Group>
                        <Stack.Screen
                            name="bottomTab"
                            component={BottomTabNav}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
                <StatusBar />
            </SafeAreaProvider>
        </Provider>
    );
}
