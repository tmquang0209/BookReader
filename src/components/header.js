import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { white } from "../constants/colors";

export const BackButton = ({ name, componentName, styleBackButton, styleText }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.backContainer}>
            <TouchableOpacity style={[styles.backButton, { ...styleBackButton }]} activeOpacity={0.5} onPress={() => (componentName ? navigation.navigate(componentName) : navigation.goBack())}>
                <Ionicons name="chevron-back-sharp" size={30} color={white} style={{ ...styleText }} />
                {name && <Text style={[styles.backText, { ...styleText }]}>{name}</Text>}
            </TouchableOpacity>
        </View>
    );
};
