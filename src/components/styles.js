import { StyleSheet } from "react-native";
import { accentGreen, black, gray5, white } from "../constants/colors";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },

    containerForm: {
        flex: 1,
        backgroundColor: gray5,
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

    backContainer: {
        position: "absolute",
        margin: 10,
        justifyContent: "center",
    },

    backButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        // marginTop: 40,
    },

    backText: {
        color: white,
        justifyContent: "center",
        fontSize: 16,
        fontFamily: "SVN-Gotham-Book",
    },
});
