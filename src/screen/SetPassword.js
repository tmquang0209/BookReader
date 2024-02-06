import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Alert, Keyboard } from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import styles from "../components/common/styles";
import { LogoWithoutText } from "../components/logo";
import { Title, BackButton } from "../components/header";
import { white, accentGreen } from "../constants/colors";
import { TextInput } from "react-native-paper";
import { Button } from "../components/button";
import { resetPassword } from "../API/authUser";

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    reNewPassword: Yup.string()
        .required("Re-type new password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const SetPassword = ({ navigation, route }) => {
    const { email, code } = route.params;
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);

    const onSubmitPress = async (values) => {
        setLoading((prev) => !prev);

        const response = await resetPassword(email, code, values.newPassword, values.reNewPassword);
        console.log(response);
        if (!response.success) {
            Alert.alert("Error", response.message);
            setLoading((prev) => !prev);
            return;
        }

        Alert.alert("Successful", response.message, [
            {
                text: "OK",
                onPress: () => navigation.navigate("GetStarted"),
            },
        ]);
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <SafeAreaView style={styles.container}>
                    <BackButton name={"Back to Login"} componentName={"GetStarted"} />
                    <LogoWithoutText />
                    <View
                        style={{
                            marginTop: 80,
                            marginLeft: 20,
                        }}
                    >
                        <Title name={"Set password"} size={25} />
                    </View>
                    <View style={[styles.containerForm, { marginTop: 10 }]}>
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <FontAwesome5 name="check-circle" size={60} color={accentGreen} />
                            <Text
                                style={{
                                    fontFamily: "SVN-Gotham-Bold",
                                    color: white,
                                    fontSize: 16,
                                }}
                            >
                                Code verified
                            </Text>
                        </View>
                        <Formik initialValues={{ newPassword: "", reNewPassword: "" }} validationSchema={validationSchema} onSubmit={(values) => onSubmitPress(values)}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <TextInput
                                        placeholder="Enter new password"
                                        style={{
                                            marginTop: 20,
                                            borderRadius: 8,
                                        }}
                                        value={values.newPassword}
                                        onChangeText={handleChange("newPassword")}
                                        onBlur={handleBlur("newPassword")}
                                        secureTextEntry={hidden}
                                        right={<TextInput.Icon icon={hidden ? "eye" : "eye-off"} onPress={() => setHidden((prev) => !prev)} />}
                                    />
                                    {errors.newPassword && touched.newPassword && <Text style={{ color: "red" }}>{errors.newPassword}</Text>}
                                    <TextInput
                                        placeholder="Re-type new password"
                                        style={{
                                            marginTop: 20,
                                            borderRadius: 8,
                                        }}
                                        value={values.reNewPassword}
                                        onChangeText={handleChange("reNewPassword")}
                                        onBlur={handleBlur("reNewPassword")}
                                        secureTextEntry={hidden}
                                        right={<TextInput.Icon icon={hidden ? "eye" : "eye-off"} onPress={() => setHidden((prev) => !prev)} />}
                                    />
                                    {errors.reNewPassword && touched.reNewPassword && <Text style={{ color: "red" }}>{errors.reNewPassword}</Text>}
                                    <Button children={"Set password"} loading={loading} onPress={handleSubmit} />
                                </>
                            )}
                        </Formik>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

const mapStateToProps = (state) => ({
    err: state.auth.err,
});

export default connect(mapStateToProps, {})(SetPassword);
