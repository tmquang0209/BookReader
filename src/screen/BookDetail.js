import React from "react";
import { Image, ImageBackground, ScrollView, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import styles from "../components/styles";
import { white } from "../constants/colors";
import { BackButton } from "../components/header";
import { CategoryTypeItem } from "../components/categoryType";

const CategoryList = ({ subjects }) => (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {subjects.map((item, index) => (
            <CategoryTypeItem title={item} key={index} />
        ))}
    </View>
);

const AuthorDetail = ({ authors }) => {
    const nameDigit = authors.name[0];

    return (
        <View style={styles.authorContainer}>
            <Avatar.Text label={nameDigit} />
            <View
                style={{
                    flex: 1,
                    marginLeft: 10,
                }}
            >
                <Text style={styles.authorName}>{authors.name}</Text>
                <Text style={styles.authorDateText}>
                    {authors.birth_year}-{authors.death_year}
                </Text>
                <Text style={styles.authorDescriptionText}>...</Text>
            </View>
        </View>
    );
};

const BookDetail = (props) => {
    const { bookData } = props.route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fixedButton}>
                <BackButton styleText={{ color: white }} />
            </View>
            <ScrollView>
                <ImageBackground source={{ uri: bookData?.formats?.image }} resizeMode="cover" blurRadius={2} style={[styles.backgroundImage, { position: "relative" }]}>
                    <LinearGradient colors={["#18191900", "#18191999", "#181919"]}>
                        <Image
                            style={{
                                height: 220,
                                width: 150,
                                alignSelf: "center",
                            }}
                            source={{ uri: bookData?.formats?.image }}
                        />
                    </LinearGradient>
                </ImageBackground>
                <View style={{ margin: 10 }}>
                    <View>
                        <View>
                            <Text style={styles.bookTitle}>{bookData?.title}</Text>
                            <FontAwesome name="bookmark-o" size={24} color={white} style={{ position: "absolute", right: 0 }} />
                        </View>
                        <Text style={[styles.authorName]}>{bookData?.author[0]?.name}</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBox}>
                                <Feather name="clock" size={24} color={white} />
                                <Text style={{ color: white, marginLeft: 10 }}>10 h</Text>
                            </View>
                            <View style={[styles.infoBox, { borderRightWidth: 0 }]}>
                                <Feather name="download" size={24} color={white} />
                                <Text style={{ color: white, marginLeft: 10 }}>{bookData?.download_count || 0} times</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ gap: 16 }}>
                        <Text style={styles.aboutTitle}>About this book</Text>
                        <Text style={styles.aboutText}>Updating...</Text>
                        <CategoryList subjects={bookData?.subjects} />
                    </View>
                    <View>
                        <View>
                            <Text style={styles.chapterTitle}>4 Chapters</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.chapterItem}>
                                <Text style={styles.chapterNumber}>01</Text>
                                <Text style={styles.chapterName}>Chapter 1</Text>
                                <Feather name="play-circle" size={30} color={white} style={{ flex: 1 }} />
                            </View>
                        </View>
                    </View>
                    <AuthorDetail authors={bookData?.author[0]} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BookDetail;
