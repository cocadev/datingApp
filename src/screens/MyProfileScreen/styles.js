import DynamicAppStyles from "../../DynamicAppStyles";
import { DynamicStyleSheet } from 'react-native-dark-mode';
import { DynamicValue } from 'react-native-dark-mode';

const dynamicStyles = new DynamicStyleSheet({
    MainContainer: {
        flex: 1,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: DynamicAppStyles.colorSet.mainThemeBackgroundColor
    },
    body: {
        width: "100%"
    },
    photoView: {
        top: Platform.OS === "ios" ? "4%" : "1%",
        width: 146,
        height: 146,
        borderRadius: 73,
        backgroundColor: "grey",
        overflow: "hidden",
        alignSelf: "center"
    },
    nameView: {
        width: "100%",
        marginTop: 45,
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontSize: 21,
        fontWeight: "bold",
        // marginRight: 10,
        color: DynamicAppStyles.colorSet.mainTextColor,
        padding: 10
    },
    myphotosView: {
        width: "100%",
        paddingHorizontal: 12,
        marginTop: 20,
        marginBottom: 15
    },
    itemView: {
        width: "100%",
        paddingVertical: 2,
        marginVertical: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginBottom: 11
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    myphotosItemView: {
        width: 100,
        height: 100,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        overflow: "hidden"
    },
    optionView: {
        width: "100%",
        marginVertical: 9,
        paddingHorizontal: 12,
        flexDirection: "row"
    },
    iconView: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    textView: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    textLabel: {
        fontSize: 16,
        color: DynamicAppStyles.colorSet.mainTextColor
    },
    photoTitleLabel: {
        fontWeight: "500",
        fontSize: 17,
        paddingLeft: 7,
        color: DynamicAppStyles.colorSet.mainTextColor
    },
    logoutView: {
        width: "92%",
        marginTop: 20,
        marginBottom: 50,
        marginHorizontal: 12,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: DynamicAppStyles.colorSet.inputBgColor,
        justifyContent: "center",
        alignItems: "center"
    },
    inactiveDot: {
        backgroundColor: new DynamicValue("#00000022", "#ffffff66"),
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    }
});

export default dynamicStyles;