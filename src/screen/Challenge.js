import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

import styles from "../components/common/styles";
import { TitleWithinUnderLine } from "../components/header";
import { accentGreen, gray4, white } from "../constants/colors";
import { congratulations, encouragement } from "../constants/text";

const Challenge = (props) => {
    const { navigation } = props;

    const onPressCreateNewChallenge = () => {
        navigation.navigate("CreateChallenge");
    };

    //create sample challenge
    const sampleData = [
        {
            id: 1,
            title: "Challenge 1",
            description: "Description 1",
            start: "Monday, 01 Jan 2024",
            end: "Monday, 01 Jan 2024",
            target: 23,
            completed: 10,
        },
        {
            id: 2,
            title: "Challenge 2",
            description: "Description 2",
            start: "Tue, 02 Feb 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 3,
            title: "Challenge 3",
            description: "Description 3",
            start: "Wed, 03 Mar 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 4,
            title: "Challenge 4",
            description: "Description 4",
            start: "Thu, 04 Apr 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 5,
            title: "Challenge 4",
            description: "Description 4",
            start: "Thu, 04 Apr 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 6,
            title: "Challenge 4",
            description: "Description 4",
            start: "Thu, 04 Apr 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 7,
            title: "Challenge 4",
            description: "Description 4",
            start: "Thu, 04 Apr 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 8,
            title: "Challenge 4",
            description: "Description 4",
            start: "Thu, 04 Apr 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 9,
            title: "Challenge 4",
            description: "Description 4",
            start: "Thu, 04 Apr 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
        {
            id: 10,
            title: "Challenge 4",
            description: "Description 4",
            start: "Thu, 04 Apr 2024",
            end: "Friday, 06 Dec 2024",
            target: 10,
            completed: 1,
        },
    ];

    const generateQuote = (progress) => {
        if (progress === 1) {
            const indexRandom = Math.floor(Math.random() * congratulations.length);
            return congratulations[indexRandom];
        } else {
            const indexRandom = Math.floor(Math.random() * encouragement.length);
            return encouragement[indexRandom];
        }
    };

    const onChallengeItemPress = (data) => {
        navigation.navigate("UpdateChallenge", { challengeItem: data });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 10, flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TitleWithinUnderLine title={"Challenge"} />
                    <Button
                        mode="contained-tonal"
                        buttonColor={accentGreen}
                        style={{
                            alignSelf: "flex-end",
                            borderRadius: 4,
                        }}
                        onPress={() => onPressCreateNewChallenge()}
                    >
                        Create new
                    </Button>
                </View>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        data={sampleData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={0.5} onPress={() => onChallengeItemPress(item)}>
                                <LinearGradient
                                    colors={["#EAB734", "#313333"]}
                                    locations={[0, 0.4]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        marginTop: 10,
                                        backgroundColor: gray4,
                                        paddingTop: 16,
                                        paddingBottom: 16,
                                        paddingLeft: 18,
                                        paddingRight: 18,
                                        flex: 1,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: white,
                                            fontFamily: "SVN-Gotham-Bold",
                                            fontSize: 18,
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text style={{ color: white }}>
                                        <Text style={{ fontFamily: "SVN-Gotham-Bold" }}>Start:</Text> {item.start}
                                    </Text>
                                    <Text style={{ color: white }}>
                                        <Text style={{ fontFamily: "SVN-Gotham-Bold" }}>End:</Text> {item.end}
                                    </Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Progress.Bar
                                            progress={item.completed / item.target}
                                            color={white}
                                            width={null}
                                            style={{ width: "65%", marginTop: 10 }}
                                            height={6}
                                            borderWidth={0}
                                            unfilledColor={"#EAF4F433"}
                                        />
                                        <Text style={{ color: white, marginLeft: 10 }}>
                                            {item.completed}/{item.target} books
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: white, fontStyle: "italic", fontFamily: "SVN-Gotham-Bold", fontSize: 10, marginTop: 10 }}>
                                            {generateQuote(item.completed / item.target)}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Challenge);
