import { TouchableOpacity, View, Image, Text } from "react-native";
import styles from "../common/styles";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

export const ListItem = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{
                flex: 1,
                flexDirection: "row",
                margin: 10,
            }}
            onPress={() => navigation.navigate("BookDetail", { bookData: item })}
        >
            <Image
                style={{
                    width: 100,
                    height: 140,
                }}
                source={{
                    uri: item.formats.image,
                }}
            />
            <View
                style={{
                    flex: 1,
                    marginLeft: 16,
                }}
            >
                <Text style={[styles.bookTitle, { fontSize: 14 }]} ellipsizeMode="tail" numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.itemBookAuthor}>{item.authors[0]?.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const GridItem = ({ bookData }) => {
    const navigation = useNavigation();
    const onItemPress = () => {
        navigation.navigate("BookDetail", { bookData });
    };

    return (
        <Animatable.View animation={"bounceIn"} style={{ width: "50%" }}>
            <TouchableOpacity
                style={{
                    margin: 5,
                }}
                activeOpacity={0.5}
                onPress={() => onItemPress()}
            >
                <Image
                    style={{
                        width: "100%",
                        height: 250,
                    }}
                    source={{
                        uri: bookData.formats.image,
                    }}
                />
                <Text style={[styles.bookTitle, { fontSize: 13 }]} numberOfLines={1} ellipsizeMode="tail">
                    {bookData.title}
                </Text>
                <Text style={[styles.itemBookAuthor, { fontSize: 13 }]} numberOfLines={1} ellipsizeMode="tail">
                    {bookData.authors[0].name}
                </Text>
            </TouchableOpacity>
        </Animatable.View>
    );
};
