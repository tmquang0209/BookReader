import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import { autoLogin } from "../store/actions/authActions";

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
    const { loggedIn, autoLogin } = props;
    const navigation = useNavigation();

    const Stack = createStackNavigator();

    useEffect(() => {
        autoLogin();
        console.log("checked", loggedIn);
    }, [loggedIn]);

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
});

export default connect(mapStateToProps, { autoLogin })(StackNav);
