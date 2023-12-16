import { useEffect, useState } from "react";
import {
    View,
    Text,
    Alert,
    Keyboard,
    SafeAreaView,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import styles from "../components/styles";
import { girlReadingBook } from "../constants/images";
import { accentGreen, gray2, gray4, gray5, white } from "../constants/colors";
import { signupAccount } from "../store/actions/authActions";

const Signup = (props) => {
    const { user, err, signupAccount, navigation } = props;

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
        console.log(userData);
        try {
            setLoading((prev) => !prev);
            await signupAccount(userData);
            setLoading((prev) => !prev);
        } catch (err) {
            console.error(err);
        }
    };

    const onLoginPress = () => {
        navigation.navigate("GetStarted");
    };

    const renderErr = () => {
        err && Alert.alert("Error", err);
    };
    useEffect(() => {
        renderErr();
        if (user.email) navigation.navigate("SelectGenres");
    }, [user, err]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <View
                        style={{
                            marginTop: 50,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={girlReadingBook}
                            style={{
                                width: 250,
                                height: 180,
                                alignSelf: "center",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: white,
                                fontFamily: "SVN-Gotham-Bold",
                                fontSize: 28,
                            }}
                        >
                            Sign up
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: gray5,
                            marginTop: 10,
                            marginLeft: 20,
                            marginRight: 20,
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 10,
                        }}
                    >
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
                            By selecting Create Account below, I agree to{" "}
                            <Text
                                style={{ color: accentGreen, fontWeight: 800 }}
                            >
                                Terms of Service
                            </Text>{" "}
                            &{" "}
                            <Text
                                style={{
                                    color: accentGreen,
                                    fontWeight: 800,
                                }}
                            >
                                Privacy Policy
                            </Text>
                        </Text>
                        <Button
                            mode="contained-tonal"
                            onPress={() => onSubmitPress()}
                            style={{
                                marginTop: 16,
                                marginBottom: 16,
                                backgroundColor: accentGreen,
                                borderRadius: 8,
                            }}
                            loading={loading}
                            disabled={loading}
                        >
                            <Text
                                style={{
                                    color: gray4,
                                    fontFamily: "SVN-Gotham-Bold",
                                }}
                            >
                                Create account
                            </Text>
                        </Button>
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
    };
};

export default connect(mapStateToProps, { signupAccount })(Signup);
