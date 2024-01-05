import { Button as DefaultButton } from "react-native-paper";
import styles from "../common/styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { gray4 } from "../../constants/colors";

export const Button = ({ children, onPress, loading, style }) => {
    return (
        <DefaultButton
            mode="contained-tonal"
            onPress={() => onPress()} // Corrected here
            style={[styles.buttonStyle, style]}
            loading={loading}
            disabled={loading}
        >
            <Text
                style={{
                    color: gray4,
                    fontFamily: "SVN-Gotham-Bold",
                }}
            >
                {children}
            </Text>
        </DefaultButton>
    );
};

export const GoogleButton = () => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                backgroundColor: white,
                flexDirection: "row",
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                borderRadius: 8,
                marginBottom: 32,
            }}
        >
            <Image
                style={{
                    marginRight: 8,
                    width: 23,
                    height: 23,
                }}
                source={googleLogo}
            />
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "SVN-Gotham-Bold",
                        fontWeight: 700,
                        alignSelf: "center",
                    }}
                >
                    Login with google
                </Text>
            </View>
        </TouchableOpacity>
    );
};
