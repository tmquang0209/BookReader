import { Pressable, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { accentGreen, gray1, gray4 } from "../../constants/colors";

export const ActiveItem = ({ id, name, onPress }) => (
    <Pressable onPress={() => onPress(id)}>
        <View
            style={{
                backgroundColor: accentGreen,
                alignSelf: "flex-start",
                padding: 12,
                borderRadius: 90,
                flexDirection: "row",
                margin: 5,
            }}
        >
            <Text
                style={{
                    color: gray4,
                    fontWeight: 700,
                    paddingRight: 10,
                }}
            >
                {name}
            </Text>
            <AntDesign name="checkcircleo" size={24} color="black" />
        </View>
    </Pressable>
);

export const UnActiveItem = ({ id, name, onPress }) => (
    <Pressable onPress={() => onPress(id)}>
        <View
            style={{
                alignSelf: "flex-start",
                padding: 12,
                borderRadius: 90,
                flexDirection: "row",
                borderColor: gray4,
                borderWidth: 1,
                margin: 5,
            }}
        >
            <Text
                style={{
                    color: gray1,
                    fontWeight: 700,
                    paddingRight: 10,
                }}
            >
                {name}
            </Text>
            <AntDesign name="pluscircleo" size={24} color="white" />
        </View>
    </Pressable>
);
