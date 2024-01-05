import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthStorage = async () => {
    const getItem = await AsyncStorage.getItem("auth");
    return getItem ? JSON.parse(getItem) : null;
};

export const setAuthStorage = async (authData) => {
    AsyncStorage.setItem("auth", JSON.stringify(authData));
};

export const removeAuthStorage = async () => {
    AsyncStorage.removeItem("auth");
};
