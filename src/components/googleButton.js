import { TouchableOpacity, Image, View, Text } from "react-native";
import { googleLogo } from "../constants/images";
import { white } from "../constants/colors";

export default GoogleButton = () => {
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
