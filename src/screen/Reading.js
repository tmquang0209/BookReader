import React, { useEffect, useState } from "react";
import { ScrollView, Text, ToastAndroid, TouchableOpacity, useWindowDimensions } from "react-native";
import { Reader, ReaderProvider, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { connect } from "react-redux";
import { Audio } from "expo-av";

//import API
import { getLastPageReading, savedLastRead, updateStatusBook } from "../API/book";
import { saveWordToDb, translateByWord } from "../API/dictionary";

//import components
import styles from "../components/common/styles";
import { DictionaryModal } from "../components/modal";
import { completed } from "../constants/text";

const Reading = ({ user, navigation, route }) => {
    const { bookId, file, cfi } = route.params;
    const { width, height } = useWindowDimensions();
    const [visible, setVisible] = useState(false);
    const [words, setWords] = useState();
    const [animating, setAnimating] = useState(false);
    const [lastPage, setLastPage] = useState();
    const searchKeyword = "all";
    const { atEnd, search, changeTheme } = useReader();

    //onLocationChange => update last page to db
    const updateLastPage = async (cfi) => {
        const response = await savedLastRead(user.idUser, bookId, cfi);
    };

    //initialLocation => open last page
    const getLastPage = async () => {
        const response = await getLastPageReading(user.idUser, bookId);
        response.success && setLastPage(response.result[0].lastPageReading);
    };

    const playSound = async (url) => {
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: url,
            },
            { shouldPlay: true }
        );
        await sound.playAsync();
    };

    const onMarkPressed = async (text, cfi) => {
        setVisible(true);

        setWords();

        translateByWord(text).then((res) => {
            setWords(res[0]);
        });
    };

    const hideModal = () => setVisible(false);

    const onSavedWord = async (word) => {
        setAnimating(true);
        saveWordToDb(user.idUser, word)
            .then((res) => {
                console.log(res);
                setAnimating(false);
                ToastAndroid.show("Saved successfully!", ToastAndroid.LONG);
            })
            .catch((err) => {
                console.log(err);
                ToastAndroid.show("Failed to save", ToastAndroid.LONG);
                setAnimating(false);
            });
    };

    const updateStatus = async () => {
        const response = await updateStatusBook(user.idUser, bookId, completed);
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        changeTheme({
                            body: {
                                background: "#333",
                            },
                            span: {
                                color: "#fff !important",
                            },
                            p: {
                                color: "#fff !important",
                            },
                            li: {
                                color: "#fff !important",
                            },
                            h1: {
                                color: "#fff !important",
                            },
                            a: {
                                color: "#fff !important",
                                "pointer-events": "auto",
                                cursor: "pointer",
                            },
                            "::selection": {
                                background: "lightskyblue",
                            },
                        })
                    }
                >
                    <Text>123</Text>
                </TouchableOpacity>
            ),
        });

        getLastPage();

        atEnd && updateStatus();
    }, []);

    return (
        <>
            <ScrollView style={styles.container}>
                <ReaderProvider>
                    <Reader
                        src={file}
                        width={width}
                        height={height}
                        fileSystem={useFileSystem}
                        onLocationChange={(cfi, process, totalPages) => updateLastPage(process.start.cfi)}
                        onSelected={(selectedText, cfi) => onMarkPressed(selectedText, cfi)}
                        enableSelection={true}
                        initialLocation={lastPage}
                        onSearch={(searchKeyword) => {
                            console.log(searchKeyword);
                        }}
                    />
                </ReaderProvider>
            </ScrollView>

            <DictionaryModal visible={visible} hideModal={hideModal} wordDetail={words} playSound={playSound} onSavedWord={onSavedWord} user={user} loading={animating} />
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Reading);
