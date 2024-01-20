import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "../components/common/styles";
import { Keyboard, SafeAreaView, Text, View, TouchableWithoutFeedback, Pressable, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { Title, BackButton } from "../components/header";
import { accentGreen, bgMain, black, gray3, gray5, white } from "../constants/colors";
import { DatePicker, longDate } from "../components/date";

const updateChallenge = ({ navigation, user, route }) => {
    const { challengeItem } = route.params;

    const [challenge, setChallenge] = useState({ ...challengeItem, start: new Date(challengeItem.start), end: new Date(challengeItem.end) });
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState(null);
    const [disable, setDisable] = useState(false);

    const onShow = (type) => {
        setDateType(type);
        setShow((prev) => !prev);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        Platform.OS === "android" && setShow(false);
        // setInfo({ ...user, birthDay: currentDate });
        dateType === "start" ? setChallenge({ ...challenge, start: currentDate }) : setChallenge({ ...challenge, end: currentDate });
    };

    const onFieldChange = (field, text) => {
        setChallenge((prevChallenge) => ({ ...prevChallenge, [field]: text }));
    };

    const handleDelete = () => {
        //delete challenge
        console.log("delete challenge");
    };

    const onDelete = () => {
        //delete challenge
        //display message to confirm
        Alert.alert("Delete Challenge", "Are you sure you want to delete this challenge?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            { text: "OK", onPress: () => handleDelete() },
        ]);
    };

    const onUpdateChallenge = () => {
        //update challenge
        console.log("update challenge");
        setDisable(true);
        setTimeout(() => {
            setDisable(false);
            navigation.navigate("Challenge");
        }, 2000);
    };

    useEffect(() => {
        setChallenge({ ...challengeItem, start: new Date(challengeItem.start), end: new Date(challengeItem.end) });
    }, []);

    //console log to check if the data is correct
    console.log(challenge);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                        flexDirection: "column",
                        height: 50,
                        alignItems: "flex-start",
                    }}
                >
                    <BackButton name={"Challenge"} />
                </View>
                <View style={{ margin: 10 }}>
                    <Title name={"Edit goal for a challenge"} size={20} color={accentGreen} />
                    <View style={{ marginTop: 16, marginBottom: 16, gap: 10 }}>
                        <TextInput
                            placeholder="Title"
                            style={{ backgroundColor: gray5 }}
                            placeholderTextColor={gray3}
                            value={challenge.title}
                            textColor={white}
                            onChangeText={(text) => onFieldChange("title", text)}
                        />

                        <TextInput
                            placeholder="Description"
                            style={{ backgroundColor: gray5 }}
                            placeholderTextColor={gray3}
                            value={challenge?.description}
                            textColor={white}
                            onChangeText={(text) => onFieldChange("description", text)}
                        />

                        <Pressable onPress={() => onShow("start")} style={{ backgroundColor: gray5, marginTop: 5, width: "100%" }} textColor={white}>
                            <Text style={{ color: white, padding: 15, fontSize: 15 }}>{longDate(challenge.start)}</Text>
                        </Pressable>

                        <Pressable onPress={() => onShow("end")} style={{ backgroundColor: gray5, marginTop: 5, width: "100%" }} textColor={white}>
                            <Text style={{ color: white, padding: 15, fontSize: 15 }}>{longDate(challenge.end)}</Text>
                        </Pressable>

                        <TextInput
                            placeholder="Target"
                            style={{ backgroundColor: gray5 }}
                            keyboardType="number-pad"
                            placeholderTextColor={gray3}
                            value={challenge.target.toString()}
                            right={<TextInput.Affix text="books" textStyle={{ color: white }} />}
                            textColor={white}
                            onChangeText={(text) => onFieldChange("target", text)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end", gap: 10, margin: 10 }}>
                    <Button
                        mode="contained-tonal"
                        buttonColor={white}
                        textColor="red"
                        style={{
                            borderRadius: 4,
                        }}
                        labelStyle={{
                            fontFamily: "SVN-Gotham-Bold",
                            fontSize: 14,
                            color: "red",
                        }}
                        onPress={() => onDelete()}
                    >
                        Delete
                    </Button>

                    <Button
                        mode="contained-tonal"
                        buttonColor={accentGreen}
                        textColor={black}
                        style={{
                            borderRadius: 4,
                        }}
                        loading={disable}
                        // disabled={disable}
                        labelStyle={{
                            fontFamily: "SVN-Gotham-Bold",
                            fontSize: 14,
                            color: bgMain,
                        }}
                        onPress={() => onUpdateChallenge()}
                    >
                        Update Challenge
                    </Button>
                </View>
                {show && (
                    <DatePicker
                        value={challenge[dateType]}
                        mode={"date"}
                        onChange={onChange}
                        onShow={onShow}
                        minimumDate={dateType === "end" ? challenge.start : new Date()}
                        maximumDate={new Date(2040, 1, 1)}
                    />
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(updateChallenge);