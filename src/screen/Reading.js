import React, { useEffect, useState } from "react";
import { ToastAndroid, View, useWindowDimensions } from "react-native";
import { Reader, ReaderProvider, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { connect } from "react-redux";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//import API
import { getLastPageReading, savedLastRead, updateStatusBook } from "../API/book";
import { saveWordToDb, translateByWord } from "../API/dictionary";

//import components
import styles from "../components/common/styles";
import { DictionaryModal } from "../components/modal";
import { completed } from "../constants/text";
import { ActivityIndicator } from "react-native-paper";

const Reading = ({ user, navigation, route }) => {
    const { bookId, file, cfi } = route.params;
    const { width, height } = useWindowDimensions();
    const [visible, setVisible] = useState(false);
    const [words, setWords] = useState();
    const [animating, setAnimating] = useState(false);
    const [lastPage, setLastPage] = useState(cfi);
    const [loading, setLoading] = useState(false);

    const { atEnd } = useReader();

    //onLocationChange => update last page to db
    const updateLastPage = async (cfi) => {
        setLoading(true);
        const res = await savedLastRead(user.idUser, bookId, cfi);
        if (res.success) {
            console.log(user.idUser, bookId, "Last page updated");
        } else {
            console.log("Failed to update last page");
            ToastAndroid.show("Failed to update last page", ToastAndroid.LONG);
        }
        setLoading(false);
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

    const hideModal = () => setVisible(false);

    const onMarkPressed = async (text, cfi) => {
        setWords();
        try {
            const res = await translateByWord(text);
            setVisible(true);
            if (!res) throw new Error("Failed to translate");

            setWords(res[0]);
        } catch (err) {
            console.error(err);
            hideModal();
            ToastAndroid.show("Failed to translate", ToastAndroid.LONG);
        }
    };

    const onSavedWord = async (word) => {
        setAnimating(true);
        saveWordToDb(user.idUser, word)
            .then((res) => {
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
        await updateStatusBook(user.idUser, bookId, completed);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        marginRight: 5,
                    }}
                >
                    {loading ? <ActivityIndicator animating={true} color="#000" /> : <MaterialCommunityIcons name="cloud-check" size={24} color="black" />}
                </View>
            ),
        });
    }, [loading]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
        });

        getLastPage();

        atEnd && updateStatus();
    }, []);

    return (
        <>
            <View style={styles.container}>
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
            </View>

            <DictionaryModal visible={visible} hideModal={hideModal} wordDetail={words} playSound={playSound} onSavedWord={onSavedWord} user={user} loading={animating} />
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Reading);
