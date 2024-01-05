import { View, Text } from "react-native";
import { gray4, gray2 } from "../../constants/colors";

export const LineOr = () => {
    return (
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
    );
};

export const Line = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
            }}
        >
            <View
                style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: gray4,
                }}
            ></View>
        </View>
    );
};
