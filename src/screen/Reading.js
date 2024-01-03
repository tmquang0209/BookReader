import React, { useEffect, useState } from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import styles from "../components/styles";
import { getLastPageReading, savedLastRead } from "../API/book";
import { connect } from "react-redux";

const Reading = ({ user, navigation, route }) => {
    const { bookId, file } = route.params;
    const { width, height } = useWindowDimensions();

    const [lastPage, setLastPage] = useState();

    //onLocationChange => update last page to db
    const updateLastPage = async (cfi) => {
        const response = await savedLastRead(user.idUser, bookId, cfi);
        console.log(response);
    };

    //initialLocation => open last page
    const getLastPage = async () => {
        const response = await getLastPageReading(user.idUser, bookId);
        response.success && setLastPage(response.result[0].lastPageReading);
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
        });
        getLastPage();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ReaderProvider>
                <Reader
                    src={file}
                    width={width}
                    height={height}
                    fileSystem={useFileSystem}
                    onLocationChange={(cfi, process, totalPages) => updateLastPage(process.start.cfi)}
                    // onMarkPressed={(text, cfi) => console.log(text, cfi)}
                    // onSelected={(selectedText, cfi) => console.log(selectedText, cfi)}
                    initialLocation={lastPage}
                    // initialLocation="7547017169599774211_1342-h-1.htm.html"
                />
            </ReaderProvider>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Reading);
