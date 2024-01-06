import { Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import styles from "../components/common/styles";
import { black, white } from "../constants/colors";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { checkWord, deleteWord, saveWordToDb } from "../API/dictionary";
import { connect } from "react-redux";

const WordDetail = ({ navigation, route, user }) => {
    const { wordDetail } = route.params;
    const [saved, setSaved] = useState(false);

    const playSound = async (url) => {
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: url,
            },
            { shouldPlay: true }
        );
        await sound.playAsync();
    };

    const handleSave = async () => {
        if (saved) {
            //delete
            const response = await deleteWord(user.idUser, wordDetail.word);
            console.log("deleted", response);
            response.success && setSaved(false);
        } else {
            //save
            const response = await saveWordToDb(user.idUser, wordDetail.word);
            console.log("saved", response);
            response.success && setSaved(true);
        }
    };

    const checkSaved = async () => {
        const response = await checkWord(user.idUser, wordDetail.word);
        console.log("check", response);
        response.success && setSaved(true);
        console.log(saved);
    };

    useEffect(() => {
        navigation.setOptions({
            title: wordDetail?.word,
            headerShown: true,
            headerStyle: { backgroundColor: black },
            headerTintColor: white,
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handleSave()}>
                    <FontAwesome name={saved ? "bookmark" : "bookmark-o"} size={24} color={white} />
                </TouchableOpacity>
            ),
        });

        checkSaved();
    }, [saved]);

    return (
        <>
            <ScrollView style={styles.container}>
                <SafeAreaView style={{ margin: 10 }}>
                    <View>
                        <View>
                            {wordDetail?.phonetics.map((item, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                                        <Text style={{ color: white }}>{item.text}</Text>
                                        {item.audio && (
                                            <Pressable onPress={() => playSound(item.audio)} style={{ padding: 5 }}>
                                                <Feather name="volume-2" size={24} color={white} />
                                            </Pressable>
                                        )}
                                    </View>
                                );
                            })}
                        </View>

                        <View>
                            {wordDetail?.meanings?.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <Text style={{ color: white }}>{item.partOfSpeech}</Text>
                                        {item.definitions.map((item, index) => {
                                            return (
                                                <View key={index} style={{ gap: 10 }}>
                                                    <Text style={{ color: "#AB40FF" }}>{item.definition}</Text>
                                                    <Text style={{ color: white, fontStyle: "italic" }}>{item.example}</Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })}
                        </View>

                        <View style={{ gap: 10 }}>
                            <Text style={{ color: white }}>Synonyms</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {wordDetail?.meanings?.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View key={index} style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                {item.synonyms.map((item, index) => {
                                                    return (
                                                        <View key={index} style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                            <Text style={{ color: white, fontStyle: "italic" }}>{item}, </Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={{ gap: 10 }}>
                            <Text style={{ color: white }}>Antonyms</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {wordDetail?.meanings?.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View key={index} style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                {item.antonyms.map((item, index) => {
                                                    return (
                                                        <View key={index} style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                            <Text style={{ color: white, fontStyle: "italic" }}>{item}, </Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(WordDetail);
