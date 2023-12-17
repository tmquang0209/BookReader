import { StyleSheet } from "react-native";
import { accentGreen, black, gray5 } from "../constants/colors";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },

    containerForm: {
        flex: 1,
        backgroundColor: gray5,
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
    },

    buttonStyle: {
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: accentGreen,
        borderRadius: 8,
    },
});
