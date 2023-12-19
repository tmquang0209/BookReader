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
        margin: 10,
        // justifyContent: "center",
        alignItems: "flex-start",
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

    itemBox: {
        margin: 10,
        gap: 16,
    },

    headerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    headerItem: {
        flex: 1,
        color: white,
        fontSize: 20,
        fontFamily: "SVN-Gotham-Bold",
    },

    showAllContainer: {
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    showAllText: {
        color: accentGreen,
        fontFamily: "SVN-Gotham-Bold",
        fontSize: 12,
        alignSelf: "center",
        justifyContent: "center",
    },

    imageItemHome: {
        width: 128,
        height: 184,
    },

    itemBookName: {
        color: white,
        fontFamily: "SVN-Gotham-Bold",
        fontSize: 12,
    },

    itemBookAuthor: {
        color: white,
        fontSize: 10,
        fontFamily: "SVN-Gotham-Light",
    },
});
