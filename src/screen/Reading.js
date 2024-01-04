import React, { useEffect, useState } from "react";
import { ScrollView, ToastAndroid, useWindowDimensions } from "react-native";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { connect } from "react-redux";

//import API
import { getLastPageReading, savedLastRead } from "../API/book";
import { saveWordToDb, translateByWord } from "../API/dictionary";

//import components
import styles from "../components/styles";
import { Audio } from "expo-av";
import { DictionaryModal } from "../components/modal";

const Reading = ({ user, navigation, route }) => {
    const { bookId, file } = route.params;
    const { width, height } = useWindowDimensions();
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [words, setWords] = useState();

    const [lastPage, setLastPage] = useState();

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

        console.log(words);
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

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
        });
        getLastPage();
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
                    />
                </ReaderProvider>
            </ScrollView>

            <DictionaryModal visible={visible} hideModal={hideModal} wordDetail={words} playSound={playSound} onSavedWord={onSavedWord} user={user} />
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Reading);
