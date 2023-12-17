import { Button as DefaultButton } from "react-native-paper";
import styles from "./styles";
import { Text } from "react-native";
import { gray4 } from "../constants/colors";

const Button = ({ children, onPress, loading }) => {
    return (
        <DefaultButton
            mode="contained-tonal"
            onPress={() => onPress()} // Corrected here
            style={styles.buttonStyle}
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

export default Button;
