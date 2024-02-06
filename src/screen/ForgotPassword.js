import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../components/common/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

import { LogoWithText } from "../components/logo";
import { Title } from "../components/header";
import { white, accentGreen } from "../constants/colors";
import { TextInput } from "react-native-paper";
import { Button } from "../components/button";
import { BackButton } from "../components/header";

import { fetchForgotPassword } from "../API/authUser";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    email: Yup.string().max(40, "Email is too long").required("Email is required"),
});

const ForgotPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const onSubmitPress = async (values) => {
        setLoading((prev) => !prev);

        const result = await fetchForgotPassword(values.email);

        if (result.success) {
            Alert.alert("Successful!", result.message, [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("VerifyCode", { email: values.email });
                        setLoading((prev) => !prev);
                    },
                },
            ]);
        }
    };

    const onLoginPress = () => {
        navigation.navigate("GetStarted");
    };

    useEffect(() => {}, []);

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <SafeAreaView style={styles.container}>
                    <BackButton name="Back to Login" componentName={"GetStarted"} />
                    <LogoWithText />
                    <View
                        style={{
                            marginTop: 80,
                            marginLeft: 20,
                        }}
                    >
                        <Title name={"Recover password"} size={25} />
                    </View>
                    <View style={[styles.containerForm, { marginTop: 10 }]}>
                        <Text
                            style={{
                                fontFamily: "SVN-Gotham-Book",
                                color: white,
                                fontSize: 11,
                            }}
                        >
                            Forgot your password? Don't worry, enter your email to reset your current password.
                        </Text>
                        <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={(values) => onSubmitPress(values)}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <TextInput
                                        placeholder="Email"
                                        style={{
                                            marginTop: 20,
                                            borderRadius: 8,
                                        }}
                                        onChangeText={handleChange("email")}
                                        onBlur={() => handleBlur("email")}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
                                    <Text style={{ color: "red" }}>{errors.email && touched.email && errors.email}</Text>
                                    <Button children={"Submit"} loading={loading} onPress={handleSubmit} />
                                </View>
                            )}
                        </Formik>

                        <View
                            style={{
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop: 24,
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
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;
