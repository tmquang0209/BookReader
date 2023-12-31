import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import styles from "../common/styles";
import { NextIcon } from "../../constants/images";

const ItemView = ({ item }) => {
    const navigation = useNavigation();

    const onItemPress = (bookId) => {
        navigation.navigate("BookDetail", { bookData: item });
    };

    return (
        <TouchableOpacity style={{ marginRight: 10, maxWidth: 130 }} activeOpacity={0.5} onPress={() => onItemPress(item.id)}>
            <Image
                style={styles.imageItemHome}
                source={{
                    uri: item?.formats.image,
                }}
            />
            <View>
                <Text style={styles.itemBookName} ellipsizeMode="tail" numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.itemBookAuthor}>{item.authors?.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const ListItem = ({ list }) => (
    <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemView item={item} />}
        ListFooterComponent={<View style={{ height: 200 }} />}
    />
);

export const ForYou = ({ list }) => {
    const navigation = useNavigation();

    const reducedList = list ? list.filter((item, index) => index <= 10) : [];
    return (
        <View style={styles.itemBox}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerItem}>For you</Text>
                <View style={styles.showAllContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("BookList", { bookList: list })}>
                        <Text style={styles.showAllText}>
                            Show all <NextIcon />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <ListItem list={reducedList} />
            </View>
        </View>
    );
};

export const Trending = ({ list }) => {
    const navigation = useNavigation();
    const reducedList = list ? list.filter((item, index) => index <= 10) : [];
    return (
        <View style={styles.itemBox}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerItem}>Trending</Text>
                <View style={styles.showAllContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("BookList", { bookList: list })}>
                        <Text style={styles.showAllText}>
                            Show all <NextIcon />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <ListItem list={reducedList} />
            </View>
        </View>
    );
};
