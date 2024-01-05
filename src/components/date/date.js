export const fullDate = (date) => {
    return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "asia/ho_chi_minh",
    });
};

export const longDate = (date) => {
    return date.toLocaleString("en-US", {
        timeZone: "asia/ho_chi_minh",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
