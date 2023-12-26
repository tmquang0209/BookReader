import { Svg, Path, Circle, G, Defs, ClipPath, Rect } from "react-native-svg";

export const banner = require("../../assets/banner.png");
export const girlReadingBook = require("../../assets/girl-and-book.png");
export const googleLogo = require("../../assets/google.png");
export const noInternet = require("../../assets/no-internet.png");
export const userIcon = require("../../assets/user.png");
export const logoutIcon = require("../../assets/logout.png");
export const demoDetail = require("../../assets/demo.png");

export const HomeIcon = ({ color }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18.0271 22H16.103H7.89696H5.97291C4.05488 21 2.5 20.4607 2.5 18.5618V9.84736C2.50739 9.09967 2.86226 8.39702 3.46203 7.94256L10.0134 2.6853C11.1662 1.77157 12.8049 1.77157 13.9577 2.6853L20.538 7.93303C21.1355 8.38935 21.4898 9.09083 21.5 9.83784V18.5618C21.5 20.4607 19.9451 22 18.0271 22Z"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const SearchIcon = ({ color }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Circle cx={11.7666} cy={11.7666} r={8.98856} stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M18.0183 18.4851L21.5423 22" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const LibraryIcon = ({ color }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.28571 18.7589V5.04458L9.76787 3.54422V20.2592L6.28571 18.7589ZM4 4.11956C4 3.41538 4.51538 2.8175 5.21165 2.71358L9.71429 1.04458C10.5734 0.916278 12 1.02598 12 1.89455V21.9084C12 22.7769 11.1448 22.8869 10.2857 22.7586L5.21165 21.0893C4.51538 20.9854 4 20.3875 4 19.6833V4.11956ZM14.2857 21.5397L14.8962 21.7247C15.7553 21.853 16.5714 21.1875 16.5714 20.3189V2.95464C16.5714 2.08607 15.7162 1.48761 14.8571 1.61575L14.2857 1.73387V21.5397ZM17.7143 20.4587L18.8126 20.6651C20 20.6651 20 19.9015 20 19.1882V4.47289C20 3.90146 20 3.13791 18.8126 3.13791L17.7143 3.30185V20.4587Z"
            fill={color}
        />
    </Svg>
);

export const ChallengeIcon = ({ color }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.9999 5.57141C11.0148 5.57141 10.0701 5.96273 9.37353 6.65929C8.67697 7.35585 8.28564 8.30059 8.28564 9.28567C8.28564 10.2708 8.67697 11.2155 9.37353 11.9121C10.0701 12.6086 11.0148 12.9999 11.9999 12.9999C12.985 12.9999 13.9297 12.6086 14.6263 11.9121C15.3228 11.2155 15.7142 10.2708 15.7142 9.28567C15.7142 8.30059 15.3228 7.35585 14.6263 6.65929C13.9297 5.96273 12.985 5.57141 11.9999 5.57141ZM9.99992 9.28567C9.99992 8.75524 10.2106 8.24654 10.5857 7.87147C10.9608 7.4964 11.4695 7.28569 11.9999 7.28569C12.5303 7.28569 13.039 7.4964 13.4141 7.87147C13.7892 8.24654 13.9999 8.75524 13.9999 9.28567C13.9999 9.8161 13.7892 10.3248 13.4141 10.6999C13.039 11.0749 12.5303 11.2857 11.9999 11.2857C11.4695 11.2857 10.9608 11.0749 10.5857 10.6999C10.2106 10.3248 9.99992 9.8161 9.99992 9.28567Z"
            fill={color}
        />
        <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.9999 1C10.5055 0.999897 9.03882 1.40399 7.7553 2.16947C6.47178 2.93495 5.41919 4.03333 4.70902 5.34826C3.99884 6.66319 3.65753 8.14571 3.72122 9.6388C3.78492 11.1319 4.25125 12.58 5.07083 13.8296L2.11427 18.9496C2.0322 19.0922 1.99289 19.2554 2.00106 19.4197C2.00922 19.584 2.06449 19.7425 2.16029 19.8763C2.25609 20.01 2.38836 20.1134 2.54131 20.174C2.69426 20.2346 2.86142 20.25 3.02284 20.2182L6.01025 19.6307L6.99424 22.5107C7.04727 22.6668 7.14416 22.8042 7.2733 22.9066C7.40244 23.0089 7.55835 23.0719 7.72236 23.088C7.88638 23.104 8.05154 23.0724 8.19806 22.997C8.34459 22.9216 8.46626 22.8055 8.54852 22.6627L11.4971 17.5565C11.832 17.5767 12.1678 17.5767 12.5028 17.5565L15.4513 22.6627C15.5337 22.8055 15.6554 22.9215 15.802 22.9968C15.9486 23.0722 16.1138 23.1036 16.2779 23.0875C16.4419 23.0713 16.5978 23.0082 16.7269 22.9057C16.8559 22.8032 16.9527 22.6657 17.0056 22.5096L17.9862 19.6227L20.9759 20.217C21.1374 20.2491 21.3047 20.234 21.4578 20.1735C21.611 20.113 21.7435 20.0096 21.8394 19.8758C21.9354 19.742 21.9908 19.5834 21.9989 19.4189C22.0071 19.2545 21.9678 19.0911 21.8856 18.9485L18.9302 13.8296C19.7498 12.5799 20.2161 11.1317 20.2798 9.63852C20.3434 8.14532 20.002 6.66272 19.2917 5.34775C18.5814 4.03279 17.5286 2.93443 16.245 2.16903C14.9613 1.40363 13.4945 0.999691 11.9999 1ZM5.42854 9.28566C5.42854 7.54282 6.12088 5.87136 7.35325 4.63899C8.58563 3.40662 10.2571 2.71428 11.9999 2.71428C13.7428 2.71428 15.4142 3.40662 16.6466 4.63899C17.879 5.87136 18.5713 7.54282 18.5713 9.28566C18.5713 11.0285 17.879 12.7 16.6466 13.9323C15.4142 15.1647 13.7428 15.8571 11.9999 15.8571C10.2571 15.8571 8.58563 15.1647 7.35325 13.9323C6.12088 12.7 5.42854 11.0285 5.42854 9.28566ZM9.69594 17.2468C8.396 16.8703 7.20818 16.1808 6.23653 15.2388L4.54283 18.1725L6.41368 17.8045C6.61698 17.7646 6.82785 17.7997 7.00728 17.9032C7.18671 18.0068 7.32255 18.1719 7.38967 18.3679L8.00681 20.1725L9.69594 17.2468ZM15.9908 20.1679L14.3039 17.2468C15.6038 16.8702 16.7916 16.1808 17.7633 15.2388L19.4547 18.1679L17.5827 17.7953C17.3788 17.7549 17.1672 17.7901 16.9872 17.8941C16.8072 17.9982 16.6712 18.1641 16.6045 18.361L15.9908 20.1679Z"
            fill={color}
        />
    </Svg>
);

export const NextIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        <G clip-path="url(#clip0_110_244)">
            <Path
                d="M8 0.75C12.2812 0.75 15.75 4.21875 15.75 8.5C15.75 12.7812 12.2812 16.25 8 16.25C3.71875 16.25 0.25 12.7812 0.25 8.5C0.25 4.21875 3.71875 0.75 8 0.75ZM11.5594 7.96875L7.325 3.73438C7.03125 3.44062 6.55625 3.44062 6.26562 3.73438L5.73438 4.26562C5.44063 4.55938 5.44063 5.03437 5.73438 5.325L8.90938 8.5L5.73438 11.675C5.44063 11.9688 5.44063 12.4438 5.73438 12.7344L6.26562 13.2656C6.55937 13.5594 7.03437 13.5594 7.325 13.2656L11.5594 9.03125C11.8531 8.7375 11.8531 8.2625 11.5594 7.96875Z"
                fill="#CDE7BE"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_110_244">
                <Rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
            </ClipPath>
        </Defs>
    </Svg>
);
