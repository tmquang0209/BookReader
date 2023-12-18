import { Text } from "react-native";
import { white } from "../constants/colors";
export default Title = ({ name, size = 28 }) => {
    return (
        <Text
            style={{
                color: white,
                fontFamily: "SVN-Gotham-Bold",
                fontSize: size,
            }}
        >
            {name}
        </Text>
    );
};
