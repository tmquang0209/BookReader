import { Button, Divider, Modal, Portal } from "react-native-paper";
import { accentGreen, black, gray3, gray5, white } from "../../constants/colors";
import { View } from "react-native-animatable";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const DictionaryModal = ({ user, wordDetail, visible, hideModal, onDeleteWord, onSavedWord }) => {
    const getExample = (item) => {
        let example = "";
        item?.meanings?.map((meaning) => {
            meaning.definitions.map((definition) => {
                if (definition.example) example = definition.example;
            });
        });
        return example;
    };

    const navigation = useNavigation();

    const onDetailPress = () => {
        hideModal();
        navigation.navigate("WordDetail", { wordDetail: wordDetail });
    };

    return (
        <Portal>
            <Modal
                key={wordDetail?.word}
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={{
                    backgroundColor: gray3,
                    padding: 20,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    position: "absolute",
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8,
                    justifyContent: "flex-start",
                }}
            >
                <View style={{ gap: 10 }}>
                    <Text style={{ color: white }}>Word</Text>
                    <View style={{ backgroundColor: gray5, padding: 10, borderRadius: 8 }}>
                        <Text style={{ color: white }}>{wordDetail?.word}</Text>
                    </View>
                    <Text style={{ color: white }}>Meaning</Text>
                    <View style={{ backgroundColor: gray5, padding: 10, borderRadius: 8, flexWrap: "wrap", flexDirection: "row" }}>
                        <View>
                            {wordDetail?.meanings?.map((item) => (
                                <Text style={{ color: white }}>
                                    ({item.partOfSpeech}): {item.definitions[0].definition}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <Text style={{ color: white }}>Example</Text>
                    <View style={{ backgroundColor: gray5, padding: 10, borderRadius: 8, flexWrap: "wrap", flexDirection: "row" }}>
                        <Text style={{ color: white }}>{getExample(wordDetail)}</Text>
                    </View>
                </View>
                <Divider style={{ marginTop: 10 }} bold />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                    }}
                >
                    {onDeleteWord && (
                        <Button mode="contained-tonal" labelStyle={{ color: "red" }} onPress={() => onDeleteWord()}>
                            Delete
                        </Button>
                    )}

                    {onSavedWord && (
                        <Button mode="contained-tonal" labelStyle={{ color: "green" }} onPress={() => onSavedWord(wordDetail?.word)}>
                            Save
                        </Button>
                    )}
                    <Button mode="contained-tonal" buttonColor={accentGreen} labelStyle={{ color: black }} onPress={onDetailPress}>
                        Detail
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};
