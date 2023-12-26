import { TouchableOpacity, View, Image, Text } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

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
                <Text style={styles.itemBookAuthor}>{item.author[0]?.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const GridItem = ({ image, title, authorName }) => (
    <TouchableOpacity
        style={{
            margin: 5,
            flex: 1,
        }}
        activeOpacity={0.5}
    >
        <Image
            style={{
                width: "100%",
                height: 250,
            }}
            source={image}
        />
        <Text style={[styles.bookTitle, { fontSize: 13 }]}>{title}</Text>
        <Text style={[styles.itemBookAuthor, { fontSize: 13 }]}>{authorName}</Text>
    </TouchableOpacity>
);
