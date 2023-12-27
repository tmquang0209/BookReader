import React, { useCallback, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen module

import { autoLogin } from "../store/actions/authActions";
import { getCatList } from "../store/actions/categoryAction";
import { fontsList } from "../constants/fonts";

import BottomTab from "./bottomTab";
import GetStarted from "../screen/GetStarted";
import Signup from "../screen/Signup";
import SelectGenres from "../screen/SelectGenres";
import ForgotPassword from "../screen/ForgotPassword";
import VerifyCode from "../screen/VerifyCode";
import SetPassword from "../screen/SetPassword";
import BookDetail from "../screen/BookDetail";
import BookList from "../screen/BookList";
import Reading from "../screen/Reading";
import ProfileDetails from "../screen/ProfileDetails";

const StackNav = (props) => {
    const { loggedIn, autoLogin, getCatList, localStorageCheck, categories } = props;

    const Stack = createStackNavigator();

    const getList = async () => {
        await getCatList();
    };

    // Load font
    const [fontsLoaded] = useFonts(fontsList);

    useEffect(() => {
        getList();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        await autoLogin();

        // Only hide SplashScreen if fonts are loaded and localStorageCheck is not "0"
        if (fontsLoaded && localStorageCheck !== "0") {
            await SplashScreen.hideAsync();
        }
    }, [autoLogin, fontsLoaded, localStorageCheck]);

    useEffect(() => {
        onLayoutRootView();
    }, [onLayoutRootView]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {!loggedIn && (
                <Stack.Group>
                    <Stack.Screen name="GetStarted" component={GetStarted} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="SelectGenres" component={SelectGenres} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="VerifyCode" component={VerifyCode} />
                    <Stack.Screen name="SetPassword" component={SetPassword} />
                </Stack.Group>
            )}

            {loggedIn && (
                <Stack.Group>
                    <Stack.Screen name="bottomTab" component={BottomTab} />
                    <Stack.Screen name="BookDetail" component={BookDetail} />
                    <Stack.Screen name="BookList" component={BookList} />
                    <Stack.Screen name="Reading" component={Reading} />
                    <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
    localStorageCheck: state.auth.localStorageCheck,
    categories: state.category.categories,
});

export default connect(mapStateToProps, { autoLogin, getCatList })(StackNav);
