import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Platform, Text, TouchableOpacity } from "react-native";
import { black, white } from "../constants/colors";

const DatePickerAndroid = ({ date, mode, onChange }) => {
    return (
        <View>
            <DateTimePicker maximumDate={new Date(2010, 11, 31)} value={date} mode={mode} onChange={onChange} />
        </View>
    );
};

const DatePickerIOS = ({ date, mode, onChange, onClose }) => {
    return (
        <View
            style={{
                position: "absolute",
                backgroundColor: black,
                width: "100%",
                zIndex: 1,
                bottom: 0,
                height: "35%",
            }}
        >
            <TouchableOpacity style={{ alignItems: "flex-end", marginRight: 10, marginTop: 10 }} onPress={onClose}>
                <Text style={{ color: white, fontSize: 20 }}>Close</Text>
            </TouchableOpacity>
            <DateTimePicker maximumDate={new Date(2010, 11, 31)} value={date} mode={mode} onChange={onChange} display="spinner" timeZoneName={"Asia/Ho_Chi_minh"} />
        </View>
    );
};

const DatePicker = ({ value, mode, onChange, onShow }) => {
    const [date, setDate] = useState(value || new Date(1970, 1, 1));

    return Platform.OS === "ios" ? <DatePickerIOS date={date} mode={mode} onChange={onChange} onClose={onShow} /> : <DatePickerAndroid date={date} mode={mode} onChange={onChange} />;
};

export default DatePicker;
