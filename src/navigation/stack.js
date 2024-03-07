import React, { useCallback, useEffect, useState } from "react";
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
import CreateChallenge from "../screen/CreateChallenge";
import UpdateChallenge from "../screen/UpdateChallenge";
import Dictionary from "../screen/Dictionary";
import WordDetail from "../screen/WordDetail";
import ChangePassword from "../screen/ChangePassword";
import SplashModal from "../screen/SplashScreen";
import { NoInternet } from "../components/internet";
import { useNetInfo } from "@react-native-community/netinfo";
import { ToastAndroid } from "react-native";

const StackNav = (props) => {
    const { loggedIn, autoLogin, getCatList } = props;

    const { isConnected } = useNetInfo();
    const [isNetwork, setIsNetwork] = useState(false);

    const [isShowSplash, setIsShowSplash] = useState(true);

    const Stack = createStackNavigator();

    const getList = async () => {
        await getCatList();
    };

    // Load font
    const [fontsLoaded] = useFonts(fontsList);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isConnected) {
                setIsNetwork(true);
                ToastAndroid.show("No internet connection", ToastAndroid.SHORT);
            } else {
                setIsNetwork(false);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [isConnected]);

    useEffect(() => {
        const prepare = async () => {
            await SplashScreen.preventAutoHideAsync();
            try {
                await autoLogin();
            } catch (error) {
                console.log("Error", error.message);
            } finally {
                await SplashScreen.hideAsync();
            }
        };
        prepare();
        getList();
        const timeout = setTimeout(() => {
            setIsShowSplash(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            {isNetwork ? (
                <>
                    <NoInternet />
                </>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName={loggedIn ? "bottomTab" : "GetStarted"}
                >
                    {isShowSplash ? (
                        <Stack.Screen name="Splash" component={SplashModal} />
                    ) : loggedIn ? (
                        <Stack.Group>
                            <Stack.Screen name="ChangePassword" component={ChangePassword} />
                            <Stack.Screen name="BookDetail" component={BookDetail} />
                            <Stack.Screen name="BookList" component={BookList} />
                            <Stack.Screen name="Reading" component={Reading} />
                            <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
                            <Stack.Screen name="Dictionary" component={Dictionary} />
                            <Stack.Screen name="CreateChallenge" component={CreateChallenge} />
                            <Stack.Screen name="UpdateChallenge" component={UpdateChallenge} />
                            <Stack.Screen name="WordDetail" component={WordDetail} />
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen name="Signup" component={Signup} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                            <Stack.Screen name="VerifyCode" component={VerifyCode} />
                            <Stack.Screen name="SetPassword" component={SetPassword} />
                        </Stack.Group>
                    )}
                    <Stack.Screen name="bottomTab" component={BottomTab} />
                    <Stack.Screen name="GetStarted" component={GetStarted} />
                    <Stack.Screen name="SelectGenres" component={SelectGenres} />
                </Stack.Navigator>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
    categories: state.category.categories,
});

export default connect(mapStateToProps, { autoLogin, getCatList })(StackNav);
