import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard, Pressable, Platform, Alert } from "react-native";
import { connect } from "react-redux";
import { Avatar, TextInput } from "react-native-paper";

import styles from "../components/styles";
import { Title } from "../components/title";
import { Line } from "../components/line";
import { gray5, white } from "../constants/colors";
import Button from "../components/button";
import DatePicker from "../components/datePicker";
import { BackButton } from "../components/header";
import { updateInfo } from "../store/actions/authActions";
import { updateInfoUser } from "../API/authUser";
import { fullDate } from "../components/date";

const ProfileDetails = (props) => {
    const { user, updateInfo } = props;

    const [info, setInfo] = useState({ ...user, birthDay: new Date(user.birthDay) });
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        Platform.OS === "android" && setShow(false);
        setInfo({ ...user, birthDay: currentDate });
    };

    const onShow = () => {
        setShow((prev) => !prev);
    };

    const handleNameChange = (text) => {
        setInfo({ ...info, fullName: text });
    };

    const onSubmitPress = async () => {
        try {
            const response = await updateInfoUser(info);
            if (response.success) {
                Alert.alert("Success", response.message);
                updateInfo(info);
            } else {
                Alert.alert("Error", response.message);
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", response.message);
        }
    };

    useEffect(() => {}, [user]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, margin: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            height: 45,
                            alignItems: "center",
                        }}
                    >
                        <BackButton />
                        <Title name={"Profile details"} />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Avatar.Text label="A" size={123} />
                    </View>
                    <Line />
                    <View>
                        <View>
                            <Text style={{ color: white, fontFamily: "SVN-Gotham-Light" }}>Your name</Text>
                            <TextInput placeholder="Enter your name" value={info.fullName} style={{ backgroundColor: gray5 }} textColor={white} onChangeText={(text) => handleNameChange(text)} />
                        </View>
                        <View>
                            <Text style={{ color: white, fontFamily: "SVN-Gotham-Light" }}>Email</Text>
                            <TextInput placeholder="Enter your name" value={info.email} style={{ backgroundColor: gray5 }} textColor={white} disabled />
                        </View>
                        <View>
                            <Text style={{ color: white, fontFamily: "SVN-Gotham-Light" }}>Date of Birth</Text>

                            <Pressable onPress={onShow} style={{ backgroundColor: gray5, marginTop: 5, width: "100%" }} textColor={white}>
                                <Text style={{ color: white, padding: 15, fontSize: 15 }}>{fullDate(info.birthDay)}</Text>
                            </Pressable>
                        </View>
                        <Button children={"Submit"} onPress={onSubmitPress} />
                    </View>
                </View>
                {show && <DatePicker value={info.birthDay} mode={"date"} onChange={onChange} onShow={onShow} />}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { updateInfo })(ProfileDetails);
