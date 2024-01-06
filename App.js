import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

//load component
import store from "./src/store";

import StackNav from "./src/navigation/stack";
import { PaperProvider } from "react-native-paper";

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <StackNav />
                    </NavigationContainer>
                    <StatusBar animated barStyle={"light-content"} />
                </SafeAreaProvider>
            </PaperProvider>
        </Provider>
    );
}
