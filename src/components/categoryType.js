import { TouchableOpacity, Text } from "react-native";
import { accentGreen, black, gray4, white } from "../constants/colors";
export const CategoryTypeItem = ({ id, title, active, onPress, style }) => (
    <TouchableOpacity
        id={id}
        style={{
            backgroundColor: active ? accentGreen : gray4,
            margin: 5,
            alignSelf: "flex-start",
            borderRadius: 8,
            ...style
        }}
        activeOpacity={0.5}
        onPress={() => onPress(id)}
    >
        <Text
            style={{
                padding: 10,
                color: active ? black : white,
                fontFamily: active ? "SVN-Gotham-Bold" : "",
            }}
        >
            {title}
        </Text>
    </TouchableOpacity>
);
