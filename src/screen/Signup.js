import { useEffect, useState } from "react";
import { View, Text, Alert, Keyboard, SafeAreaView, TouchableWithoutFeedback, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { Button } from "../components/button";
import styles from "../components/common/styles";
import { accentGreen, gray2, gray4, white } from "../constants/colors";
import { signupAccount, emptyAuth } from "../store/actions/authActions";
import { LogoWithoutText } from "../components/logo";
import { Title } from "../components/header";

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required("Full name is required")
        .max(50, "Full name must be at most 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "Full name must contain only letters"),
    // fullName: Yup.string().matches(/^[a-zA-Z]+$/, "Full name must contain at least one letter"),
    email: Yup.string().email("Invalid email").required("Email is required").max(40, "Email must be at most 40 characters"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    rePassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = (props) => {
    const { loggedIn, user, err, signupAccount, navigation, emptyAuth } = props;

    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);

    const onSubmitPress = async (userData) => {
        try {
            setLoading((prev) => !prev);
            await signupAccount(userData);
            if (loggedIn) {
                navigation.replace("SelectGenres");
            }
            setLoading((prev) => !prev);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong. Please try again.");
            setLoading((prev) => !prev);
        }
    };

    const emptyErr = async () => {
        await emptyAuth();
    };

    const onLoginPress = () => {
        navigation.navigate("GetStarted");
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
        }
    };

    useEffect(() => {
        renderErr();
        if (user?.email) {
            navigation.replace("SelectGenres");
        }
        console.log("signup", user);
    }, [user, err]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <LogoWithoutText />
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                        }}
                    >
                        <Title name="Sign up" />
                    </View>
                    <View style={[styles.containerForm, { marginTop: 10 }]}>
                        <View
                            style={{
                                marginBottom: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: white,
                                    fontSize: 14,
                                    fontFamily: "SVN-Gotham-Book",
                                }}
                            >
                                Looks like you don't have an account.
                            </Text>
                            <Text
                                style={{
                                    color: white,
                                    fontSize: 14,
                                    fontFamily: "SVN-Gotham-Book",
                                }}
                            >
                                Let's create a new account for you.
                            </Text>
                        </View>
                        <Formik initialValues={{ fullName: "", email: "", password: "", rePassword: "" }} validationSchema={validationSchema} onSubmit={(values) => onSubmitPress(values)}>
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <>
                                    <TextInput
                                        placeholder="Full name"
                                        value={values.fullName}
                                        onBlur={() => setFieldTouched("fullName")}
                                        onChangeText={handleChange("fullName")}
                                        style={{
                                            borderRadius: 8,
                                        }}
                                    />
                                    {errors.fullName && touched.fullName && <Text style={{ fontSize: 12, color: "red" }}>{errors.fullName}</Text>}
                                    <TextInput
                                        placeholder="Email"
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={() => setFieldTouched("email")}
                                        keyboardType="email-address"
                                        style={{
                                            marginTop: 10,
                                            borderRadius: 8,
                                        }}
                                        autoCapitalize="none"
                                    />
                                    {errors.email && touched.email && <Text style={{ fontSize: 12, color: "red" }}>{errors.email}</Text>}
                                    <TextInput
                                        placeholder="Password"
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={() => setFieldTouched("password")}
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
                                    {errors.password && touched.password && <Text style={{ fontSize: 12, color: "red" }}>{errors.password}</Text>}
                                    <TextInput
                                        placeholder="Re-password"
                                        value={values.rePassword}
                                        onChangeText={handleChange("rePassword")}
                                        onBlur={() => setFieldTouched("rePassword")}
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
                                    {errors.rePassword && touched.rePassword && <Text style={{ fontSize: 12, color: "red" }}>{errors.rePassword}</Text>}
                                    <Text
                                        style={{
                                            marginTop: 16,
                                            color: white,
                                            fontSize: 14,
                                        }}
                                    >
                                        By selecting Create Account below, I agree to <Text style={{ color: accentGreen, fontWeight: 800 }}>Terms of Service</Text> &{" "}
                                        <Text
                                            style={{
                                                color: accentGreen,
                                                fontWeight: 800,
                                            }}
                                        >
                                            Privacy Policy
                                        </Text>
                                    </Text>
                                    <Button children={"Create account"} onPress={handleSubmit} loading={loading} />
                                </>
                            )}
                        </Formik>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 32,
                                marginBottom: 32,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    height: 2,
                                    backgroundColor: gray4,
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: 16,
                                    marginRight: 16,
                                    color: gray2,
                                }}
                            >
                                Or
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                    height: 2,
                                    backgroundColor: gray4,
                                }}
                            />
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
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => onLoginPress()}>
                                <Text
                                    style={{
                                        color: accentGreen,
                                        fontFamily: "SVN-Gotham-Bold",
                                    }}
                                >
                                    Log in
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
        user: state.auth.user,
        err: state.auth.err,
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, { signupAccount, emptyAuth })(Signup);
