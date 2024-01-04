import { FlatList, Image, SafeAreaView, Text, Touchable, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import styles from "../components/styles";
import { BackButton } from "../components/header";
import { Title } from "../components/title";
import { cartoonLearningEnglish } from "../constants/images";
import { gray3, white } from "../constants/colors";
import { useEffect, useState } from "react";
import { deleteWord, getWordList } from "../API/dictionary";
import { DictionaryModal } from "../components/modal";

const EmptyDictionary = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image
                style={{
                    width: 250,
                    height: 250,
                }}
                source={cartoonLearningEnglish}
            />
            <Text
                style={{
                    color: white,
                    fontFamily: "SVN-Gotham-Bold",
                    fontSize: 20,
                }}
            >
                No word found!
            </Text>
            <Text
                style={{
                    color: white,
                    fontFamily: "SVN-Gotham-Thin",
                    fontSize: 16,
                    textAlign: "center",
                    margin: 20,
                }}
            >
                Add new words from the book to review whenever needed
            </Text>
        </View>
    );
};

const WordItem = ({ item, showModal }) => {
    return (
        <TouchableOpacity onPress={() => showModal(item)} activeOpacity={0.5} style={{ backgroundColor: gray3, gap: 10, margin: 5, padding: 10, width: "50%" }}>
            <Text
                style={{
                    color: white,
                }}
            >
                {item.word} ({item.meanings[0].partOfSpeech})
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {item.phonetics.map((phonetic) => (
                    <View>
                        <Text style={{ color: white, fontStyle: "italic" }}>{phonetic.text}, </Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
};
const Dictionary = ({ user }) => {
    const [wordList, setWordList] = useState([]);

    const [visible, setVisible] = useState(false);

    const [wordDetail, setWordDetail] = useState({});

    const showModal = (item) => {
        setVisible(true);
        setWordDetail(item);
    };
    const hideModal = () => setVisible(false);

    //get from server use useMemo
    const getList = async () => {
        const data = await getWordList(user.idUser);
        data.success && setWordList(data.data);
    };

    const onDeleteWord = async () => {
        const data = await deleteWord(user.idUser, wordDetail.word);
        data.success && getList();
        hideModal();
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={{ height: 50, flexDirection: "column", alignItems: "flex-start" }}>
                    <BackButton name={"Account"} />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Title name={"Your dictionary"} size={24} />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={wordList}
                        key={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <WordItem item={item} showModal={showModal} />}
                        ListEmptyComponent={<EmptyDictionary />}
                    />
                </View>
            </SafeAreaView>
            <DictionaryModal wordDetail={wordDetail} visible={visible} onDeleteWord={onDeleteWord} hideModal={hideModal} />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, {})(Dictionary);
