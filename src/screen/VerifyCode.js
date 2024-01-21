import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { fetchForgotPassword, fetchVerifyCode } from "../API/authUser";

import styles from "../components/common/styles";
import { LogoWithText } from "../components/logo";
import { Title, BackButton } from "../components/header";
import { white, accentGreen } from "../constants/colors";
import { Button } from "../components/button";
import { validateNumber } from "../components/validate/number";

const VerifyCode = ({ navigation, route }) => {
    const { email } = route.params;
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");

    const onSubmitPress = async () => {
        setLoading((prev) => !prev);

        if (code === "") {
            Alert.alert("Error", "Please fill in all the information.");
            setLoading((prev) => !prev);
            return;
        } else if (code.length !== 6) {
            Alert.alert("Error", "Code is invalid.");
            setLoading((prev) => !prev);
            return;
        } else if (validateNumber(code) === false) {
            Alert.alert("Error", "Code is invalid.");
            setLoading((prev) => !prev);
            return;
        }

        const response = await fetchVerifyCode(email, code);

        if (!response.success) {
            Alert.alert("Error!", response.message || response.error);
            setLoading((prev) => !prev);
            return;
        }
        navigation.navigate("SetPassword", { email, code });
        setLoading((prev) => !prev);
    };

    const onResendPress = async () => {
        const result = await fetchForgotPassword(email);
        if (result.success) {
            Alert.alert("Successful!", result.message, [
                {
                    text: "OK",
                },
            ]);
        } else {
            Alert.alert("Error!", result.message || result.error, [
                {
                    text: "OK",
                },
            ]);
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <TouchableWithoutFeedback>
                <SafeAreaView style={styles.container}>
                    <BackButton name={"Back to Login"} componentName={"GetStarted"} />
                    <LogoWithText />
                    <View
                        style={{
                            marginTop: 80,
                            marginLeft: 20,
                        }}
                    >
                        <Title name={"Verify Code"} size={25} />
                    </View>
                    <View style={[styles.containerForm, { marginTop: 10 }]}>
                        <Text
                            style={{
                                fontFamily: "SVN-Gotham-Book",
                                color: white,
                                fontSize: 11,
                            }}
                        >
                            An authentication code has been sent to your email.
                        </Text>
                        <TextInput
                            placeholder="Enter code"
                            style={{
                                marginTop: 20,
                                borderRadius: 8,
                            }}
                            value={code}
                            keyboardType="number-pad"
                            onChangeText={(text) => setCode(text)}
                        />
                        <Button children={"Verify"} loading={loading} onPress={onSubmitPress} />
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
                                Don't receive a code?{" "}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "center",
                                }}
                                onPress={() => onResendPress()}
                            >
                                <Text
                                    style={{
                                        color: accentGreen,
                                        fontFamily: "SVN-Gotham-Bold",
                                        marginRight: 4,
                                    }}
                                >
                                    Resend
                                </Text>
                                <Ionicons name="reload" size={16} color={accentGreen} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default VerifyCode;
