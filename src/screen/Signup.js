import { useEffect, useState } from "react";
import { View, Text, Alert, Keyboard, SafeAreaView, TouchableWithoutFeedback, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";

import Button from "../components/button";
import styles from "../components/common/styles";
import { accentGreen, gray2, gray4, white } from "../constants/colors";
import { signupAccount, emptyAuth } from "../store/actions/authActions";
import { LogoWithoutText } from "../components/logo";
import { Title } from "../components/header";

const Signup = (props) => {
    const { loggedIn, user, err, signupAccount, navigation, emptyAuth } = props;

    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const onSubmitPress = async () => {
        const userData = {
            fullName,
            email,
            password,
            rePassword,
        };
        try {
            setLoading((prev) => !prev);
            await signupAccount(userData);
            if (loggedIn) {
                navigation.replace("SelectGenres");
            }
            setLoading((prev) => !prev);
        } catch (err) {
            console.error(err);
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
        if (user.email) {
            navigation.replace("SelectGenres");
        }
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
                        <TextInput
                            placeholder="Full name"
                            value={fullName}
                            onChangeText={(text) => setFullName(text)}
                            style={{
                                borderRadius: 8,
                            }}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                            style={{
                                marginTop: 10,
                                borderRadius: 8,
                            }}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
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
                        <TextInput
                            placeholder="Re-password"
                            value={rePassword}
                            onChangeText={(text) => setRePassword(text)}
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
                        <Button children={"Create account"} onPress={onSubmitPress} loading={loading} />
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
