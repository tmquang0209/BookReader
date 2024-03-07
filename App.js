import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

//load component
import StackNav from "./src/navigation/stack";
import { PaperProvider } from "react-native-paper";

import { persistor, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <NavigationContainer>
                        <StackNav />
                    </NavigationContainer>
                    <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
}
