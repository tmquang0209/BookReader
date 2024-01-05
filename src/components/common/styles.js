import { Dimensions, StyleSheet } from "react-native";
import { accentGreen, black, gray4, gray5, white, BGShade } from "../../constants/colors";

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

    fixedButton: {
        position: "absolute",
        top: 10,
        left: 10,
        width: 50,
        height: 50,
        backgroundColor: "rgba(52, 52, 52, 0.4)",
        borderRadius: 90,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },

    backContainer: {
        margin: 10,
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
        flex: 1,
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

    backgroundImage: {
        width: "100%",
        height: 350,
        justifyContent: "flex-end",
    },

    bookImage: {
        height: 220,
        width: 150,
        alignSelf: "center",
    },

    bookTitle: {
        color: white,
        fontFamily: "SVN-Gotham-Bold",
        fontSize: 20,
    },

    authorName: {
        color: white,
        fontFamily: "SVN-Gotham-Book",
        fontSize: 14,
    },

    infoContainer: {
        backgroundColor: BGShade,
        flex: 1,
        flexDirection: "row",
        marginTop: 13,
        marginBottom: 23,
        borderRadius: 8,
    },

    infoBox: {
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: white,
    },

    infoIcon: {
        color: white,
    },

    aboutTitle: {
        color: white,
        fontFamily: "SVN-Gotham-Bold",
        fontSize: 16,
    },

    aboutText: {
        color: white,
        fontFamily: "SVN-Gotham-Light",
        fontSize: 14,
    },

    genreButton: {
        backgroundColor: gray4,
        margin: 5,
        alignSelf: "flex-start",
        borderRadius: 8,
    },

    genreText: {
        padding: 10,
        color: white,
    },

    chapterTitle: {
        color: white,
        fontFamily: "SVN-Gotham-Bold",
        fontSize: 20,
        marginTop: 20,
    },

    chapterItem: {
        flex: 1,
        flexDirection: "row",
        marginTop: 24,
    },

    chapterNumber: {
        color: white,
        flex: 1,
        fontFamily: "SVN-Gotham-Light",
        fontSize: 16,
    },

    chapterName: {
        color: white,
        flex: 5,
        fontFamily: "SVN-Gotham-Bold",
        fontSize: 16,
    },

    playIcon: {
        flex: 1,
    },

    authorContainer: {
        backgroundColor: BGShade,
        flex: 1,
        flexDirection: "row",
        padding: 12,
        marginTop: 30,
        borderRadius: 12,
    },

    avatar: {
        // Add any avatar styles here
    },

    authorInfoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    authorNameText: {
        color: white,
        fontFamily: "SVN-Gotham-Bold",
        fontSize: 16,
    },
    authorDateText: {
        color: white,
        fontFamily: "SVN-Gotham-Light",
        fontSize: 12,
    },
    authorDescriptionText: {
        color: white,
        marginTop: 8,
        fontFamily: "SVN-Gotham-Light",
    },

    fullNameText: {
        fontSize: 24,
        color: white,
        fontFamily: "SVN-Gotham-Bold",
    },

    flexView1: {
        flex: 1,
    },

    textNormal: {
        color: white,
        fontSize: 12,
    },

    headerContainer: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
    },

    bannerImage: {
        width: Dimensions.get("screen").width - 15,
        height: 200,
        margin: 5,
        borderRadius: 10,
        alignSelf: "center",
    },

    lastReadImg: {
        width: 100,
        height: 140,
        marginLeft: 16,
        marginTop: 9,
    },

    lastViewContainer: {
        height: 150,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        flex: 1,
        flexDirection: "row",
    },
});
