import React, { useEffect, useState } from "react";
import { Alert, Image, Keyboard, SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import styles from "../components/common/styles";

import { updatePassword } from "../API/authUser";
import { gray5, white } from "../constants/colors";

import { BackButton, Title } from "../components/header";
import { Button } from "../components/button";

const validationSchema = Yup.object().shape({
    curPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    rePassword: Yup.string()
        .required("Re-password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = (props) => {
    const { user } = props;

    const [disable, setDisable] = useState(false);
    const [show, setShow] = useState(true);

    const onSubmitPress = async (values) => {
        Keyboard.dismiss();
        setDisable(true);
        const response = await updatePassword({ ...values, idUser: user.idUser });
        setDisable(false);

        if (response.success) {
            Alert.alert("Success", "Change password successfully", [{ text: "OK", onPress: () => props.navigation.goBack() }]);
        } else {
            Alert.alert("Error", response.error || response.message, [{ text: "OK" }]);
        }
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1, margin: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                height: 45,
                                alignItems: "center",
                            }}
                        >
                            <BackButton />
                            <Title name={"Change password"} size={20} />
                        </View>
                        <Formik initialValues={{ curPassword: "", newPassword: "", rePassword: "" }} validationSchema={validationSchema} onSubmit={(values) => onSubmitPress(values)}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <View>
                                        <Text style={{ color: white, fontFamily: "SVN-Gotham-Light", paddingVertical: 5 }}>Current password</Text>
                                        <TextInput
                                            placeholder="Enter your current password"
                                            value={values.curPassword}
                                            style={{ backgroundColor: gray5 }}
                                            textColor={white}
                                            onChangeText={handleChange("curPassword")}
                                            onBlur={handleBlur("curPassword")}
                                            secureTextEntry={show}
                                            right={
                                                <TextInput.Icon
                                                    color={white}
                                                    icon={show ? "eye" : "eye-off"}
                                                    onPress={() => {
                                                        setShow((prev) => !prev);
                                                        Keyboard.dismiss();
                                                    }}
                                                />
                                            }
                                        />
                                        {errors.curPassword && touched.curPassword && <Text style={{ color: "red" }}>{errors.curPassword}</Text>}
                                    </View>
                                    <View>
                                        <Text style={{ color: white, fontFamily: "SVN-Gotham-Light", paddingVertical: 5 }}>New password</Text>
                                        <TextInput
                                            placeholder="Enter new password"
                                            value={values.newPassword}
                                            style={{ backgroundColor: gray5 }}
                                            textColor={white}
                                            onChangeText={handleChange("newPassword")}
                                            onBlur={handleBlur("newPassword")}
                                            secureTextEntry={show}
                                            right={
                                                <TextInput.Icon
                                                    color={white}
                                                    icon={show ? "eye" : "eye-off"}
                                                    onPress={() => {
                                                        setShow((prev) => !prev);
                                                        Keyboard.dismiss();
                                                    }}
                                                />
                                            }
                                        />
                                        {errors.newPassword && touched.newPassword && <Text style={{ color: "red" }}>{errors.newPassword}</Text>}
                                    </View>
                                    <View>
                                        <Text style={{ color: white, fontFamily: "SVN-Gotham-Light", paddingVertical: 5 }}>Re-password</Text>
                                        <TextInput
                                            placeholder="Enter new password"
                                            value={values.rePassword}
                                            style={{ backgroundColor: gray5 }}
                                            textColor={white}
                                            onChangeText={handleChange("rePassword")}
                                            secureTextEntry={show}
                                            right={
                                                <TextInput.Icon
                                                    color={white}
                                                    icon={show ? "eye" : "eye-off"}
                                                    onPress={() => {
                                                        setShow((prev) => !prev);
                                                        Keyboard.dismiss();
                                                    }}
                                                />
                                            }
                                        />
                                        {errors.rePassword && touched.rePassword && <Text style={{ color: "red" }}>{errors.rePassword}</Text>}
                                    </View>

                                    <Button children={"Submit"} onPress={handleSubmit} loading={disable} />
                                </View>
                            )}
                        </Formik>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(ChangePassword);
