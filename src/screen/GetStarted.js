import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";

import { loginUser, emptyAuth, autoLogin } from "../store/actions/authActions";
import styles from "../components/common/styles";
import { accentGreen, white } from "../constants/colors";
import { LogoWithText } from "../components/logo";
import { GoogleButton, Button } from "../components/button";
import { LineOr } from "../components/common/line";
import { validateEmail } from "../components/validate/email";

const GetStarted = (props) => {
    const { loggedIn, err, loginUser, navigation, emptyAuth, autoLogin } = props;

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [hidden, setHidden] = useState(true);

    const onSubmitPress = async () => {
        setLoading((prev) => !prev);

        if (validateEmail(email) && password.length >= 6)
            try {
                await loginUser({ email, password });
            } catch (error) {
                console.log("Error", error.message);
            }
        else Alert.alert("Error", "Email or password is invalid");

        setLoading((prev) => !prev);
    };

    const onForgotPasswordPress = async () => {
        await emptyAuth();
        navigation.navigate("ForgotPassword");
    };

    const onSignupPress = async () => {
        await emptyAuth();
        navigation.navigate("Signup");
    };

    const emptyErr = async () => {
        await emptyAuth();
    };

    const renderErr = () => {
        if (err) {
            Alert.alert("Error", err, [
                {
                    text: "OK",
                    onPress: () => {
                        emptyErr();
                    },
                },
            ]);
            setTimeout(() => {
                emptyAuth();
            }, 1000);
        }
    };

    useEffect(() => {
        autoLogin();
        renderErr();
        if (loggedIn) navigation.replace("bottomTab");
    }, [err, loggedIn]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <LogoWithText />
                    <View style={[styles.containerForm, { marginTop: 50 }]}>
                        <TextInput
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                            style={{
                                borderRadius: 8,
                            }}
                        />
                        <TextInput
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            right={
                                <TextInput.Icon
                                    icon={hidden ? "eye" : "eye-off"}
                                    onPress={() => {
                                        setHidden((prev) => !prev);
                                        Keyboard.dismiss();
                                    }}
                                />
                            }
                            secureTextEntry={hidden}
                            style={{
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                        <Button children="Login" onPress={onSubmitPress} loading={loading} />
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                            }}
                            onPress={() => onForgotPasswordPress()}
                        >
                            <Text
                                style={{
                                    color: accentGreen,
                                    fontFamily: "SVN-Gotham-Bold",
                                    fontSize: 14,
                                    fontWeight: "700",
                                }}
                            >
                                Forgot password?
                            </Text>
                        </TouchableOpacity>

                        <LineOr />

                        <View>
                            <GoogleButton />
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "SVN-Gotham-Regular",
                                    fontWeight: 400,
                                    color: white,
                                    fontSize: 14,
                                }}
                            >
                                Don't have an account?
                            </Text>
                            <TouchableOpacity onPress={() => onSignupPress()}>
                                <Text
                                    style={{
                                        color: accentGreen,
                                        fontFamily: "SVN-Gotham-Bold",
                                    }}
                                >
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => {
    return {
        err: state.auth.err,
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, { loginUser, emptyAuth, autoLogin })(GetStarted);
