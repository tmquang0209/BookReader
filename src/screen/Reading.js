import React, { useEffect } from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import styles from "../components/styles";
import { black, white } from "../constants/colors";

export default Reading = ({ navigation, route }) => {
    const { file } = route.params;
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            // headerStyle: { backgroundColor: black },
            // headerTitleStyle: { color: white },
        });
        console.log(file);
    }, []);


    //onLocationChange => update last page to db
    //initialLocation => open last page
    return (
        <SafeAreaView style={styles.container}>
            <ReaderProvider>
                <Reader
                    src={file.replace("3.images", "")}
                    width={width}
                    height={height}
                    fileSystem={useFileSystem}
                    onLocationChange={(cfi, process, totalPages) => console.log("process", cfi, process, totalPages)}
                    // onMarkPressed={(text, cfi) => console.log(text, cfi)}
                    // onSelected={(selectedText, cfi) => console.log(selectedText, cfi)}
                    initialLocation="epubcfi(/6/12!/4/6[pgepubid00009]/42/49:0)"
                    // initialLocation="7547017169599774211_1342-h-1.htm.html"
                />
            </ReaderProvider>
        </SafeAreaView>
    );
};
