import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import styles from "../components/common/styles";
import { BackButton, Title } from "../components/header";
import { gray3, white } from "../constants/colors";
import { deleteWord, getWordList } from "../API/dictionary";
import { DictionaryModal } from "../components/modal";
import EmptyData from "../components/empty";

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
                {item.phonetics.map((phonetic, index) => (
                    <View key={index}>
                        <Text style={{ color: white, fontStyle: "italic" }}>
                            {phonetic.text} {index < item.phonetics.length - 1 && ","}
                        </Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
};
const Dictionary = ({ user }) => {
    const [wordList, setWordList] = useState([]);

    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);

    const [wordDetail, setWordDetail] = useState([]);

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
        setAnimating(true);
        const data = await deleteWord(user.idUser, wordDetail.word);
        data.success && getList();
        setAnimating(false);
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
                        ListEmptyComponent={<EmptyData header="No word found!" message="Add new words from the book to review whenever needed" />}
                    />
                </View>
            </SafeAreaView>
            <DictionaryModal wordDetail={wordDetail} visible={visible} onDeleteWord={onDeleteWord} hideModal={hideModal} loading={animating} />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, {})(Dictionary);
