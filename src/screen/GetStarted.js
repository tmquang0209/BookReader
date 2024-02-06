import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

import { loginUser, emptyAuth, autoLogin } from "../store/actions/authActions";
import styles from "../components/common/styles";
import { accentGreen, white } from "../constants/colors";
import { LogoWithText } from "../components/logo";
import { GoogleButton, Button } from "../components/button";
import { LineOr } from "../components/common/line";

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

const GetStarted = (props) => {
    const { loggedIn, err, loginUser, navigation, emptyAuth, autoLogin } = props;

    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);

    const onSubmitPress = async (values) => {
        setLoading((prev) => !prev);

        try {
            await loginUser({ ...values });
            navigation.navigate("bottomTab");
        } catch (error) {
            console.log("Error", error.message);
        }

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
        renderErr();
    }, [err, loggedIn]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            await autoLogin();
            if (loggedIn) navigation.navigate("bottomTab");
        };

        checkLoginStatus();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <LogoWithText />
                    <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={(values) => onSubmitPress(values)}>
                        {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                            <View style={[styles.containerForm, { marginTop: 50 }]}>
                                <TextInput
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    style={{
                                        borderRadius: 8,
                                    }}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={() => setFieldTouched("email")}
                                    autoCapitalize="none"
                                />
                                {errors.email && touched.email && <Text style={{ fontSize: 12, color: "red" }}>{errors.email}</Text>}
                                <TextInput
                                    placeholder="Password"
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
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={() => setFieldTouched("password")}
                                />
                                {errors.password && touched.password && <Text style={{ fontSize: 10, color: "red" }}>{errors.password}</Text>}
                                <Button children="Login" onPress={handleSubmit} loading={loading} disabled={!isValid} />
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
                        )}
                    </Formik>
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
