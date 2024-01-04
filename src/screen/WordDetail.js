import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../components/styles";
import { white } from "../constants/colors";
import { Audio } from "expo-av";

export default WordDetail = ({ route }) => {
    const { wordDetail } = route.params;
    console.log(wordDetail);
    const playSound = async (url) => {
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: url,
            },
            { shouldPlay: true }
        );
        await sound.playAsync();
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <SafeAreaView style={{ margin: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 5,
                        }}
                    >
                        <Text style={{ color: white, fontSize: 20 }}>{wordDetail?.word}</Text>
                    </View>

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
