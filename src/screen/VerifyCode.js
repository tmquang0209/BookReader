import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";
import styles from "../components/styles";
import { LogoWithText } from "../components/logo";
import { Title } from "../components/title";
import { white, accentGreen } from "../constants/colors";
import { TextInput } from "react-native-paper";
import Button from "../components/button";
import { BackButton } from "../components/header";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fetchForgotPassword, fetchVerifyCode } from "../API/authUser";

const VerifyCode = ({ navigation, route }) => {
    const { email } = route.params;
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");

    const onSubmitPress = async () => {
        setLoading((prev) => !prev);
        const response = await fetchVerifyCode(email, code);
        console.log(response);
        if (!response.success) {
            Alert.alert("Error!", response.message);
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
