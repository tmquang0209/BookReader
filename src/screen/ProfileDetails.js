import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard, Pressable, Platform, Alert } from "react-native";
import { connect } from "react-redux";
import { Avatar, TextInput } from "react-native-paper";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { updateInfoUser } from "../API/authUser";

import styles from "../components/common/styles";
import { BackButton, Title } from "../components/header";
import { Line } from "../components/common/line";
import { gray5, white } from "../constants/colors";
import { Button } from "../components/button";
import { updateInfo } from "../store/actions/authActions";
import { fullDate, DatePicker } from "../components/date";

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required("Full name is required")
        .max(50, "Full name must be at most 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "Full name must contain only letters")
        .label("Full Name"),
});

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

    const onSubmitPress = async (values) => {
        try {
            const response = await updateInfoUser({ ...info, fullName: values.fullName });
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
                    <Formik initialValues={info} onSubmit={(values) => onSubmitPress(values)} validationSchema={validationSchema}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View>
                                    <Text style={{ color: white, fontFamily: "SVN-Gotham-Light" }}>Your name</Text>
                                    <TextInput
                                        placeholder="Enter your name"
                                        style={{ backgroundColor: gray5 }}
                                        textColor={white}
                                        onChangeText={handleChange("fullName")}
                                        onBlur={handleBlur("fullName")}
                                        value={values.fullName}
                                    />
                                    {errors.fullName && touched.fullName && <Text style={{ color: "red" }}>{errors.fullName}</Text>}
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
                                <Button children={"Submit"} onPress={handleSubmit} />
                            </View>
                        )}
                    </Formik>
                </View>
                {show && <DatePicker value={info.birthDay} mode={"date"} onChange={onChange} onShow={onShow} minimumDate={new Date(1950, 1, 1)} maximumDate={new Date(2010, 1, 1)} />}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { updateInfo })(ProfileDetails);
