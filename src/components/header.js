import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { white } from "../constants/colors";

export const BackButton = ({ name, componentName }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.backContainer}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.5} onPress={() => navigation.navigate(componentName)}>
                <Ionicons name="chevron-back-sharp" size={30} color={white} />
                {name && <Text style={styles.backText}>{name}</Text>}
            </TouchableOpacity>
        </View>
    );
};
