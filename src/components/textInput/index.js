import { TextInput } from "react-native-paper";
import { accentGreen, gray2, gray4, white } from "../../constants/colors";

export const KeywordInput = ({ onSearchSubmit, keyword, setKeyword }) => {
    return (
        <TextInput
            left={<TextInput.Icon icon={"magnify"} color={gray2} />}
            placeholder="Title, author or keyword"
            style={{
                backgroundColor: gray4,
                borderRadius: 8,
            }}
            textColor={white}
            activeUnderlineColor={accentGreen}
            placeholderTextColor={gray2}
            onSubmitEditing={() => onSearchSubmit()}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
        />
    );
};
