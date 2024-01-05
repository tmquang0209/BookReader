import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../components/common/styles";
import { LogoWithText } from "../components/logo";
import { Title } from "../components/header";
import { white, accentGreen, black } from "../constants/colors";
import { TextInput } from "react-native-paper";
import Button from "../components/button";
import { BackButton } from "../components/header";
import { fetchForgotPassword } from "../API/authUser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const onSubmitPress = async () => {
        setLoading((prev) => !prev);

        if (email === "") {
            Alert.alert("Error", "Please fill in all the information.");
            setLoading((prev) => !prev);
            return;
        }

        const result = await fetchForgotPassword(email);

        if (result.success) {
            Alert.alert("Successful!", result.message, [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("VerifyCode", { email });
                        setLoading((prev) => !prev);
                    },
                },
            ]);
        }
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
                        <TextInput
                            placeholder="Email"
                            style={{
                                marginTop: 20,
                                borderRadius: 8,
                            }}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Button children={"Submit"} loading={loading} onPress={onSubmitPress} />
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
                                Don't have an account?{" "}
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
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPassword;
