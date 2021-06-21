import { DynamicStyleSheet } from 'react-native-dark-mode';
import DynamicAppStyles from "../../DynamicAppStyles";
import TNColor from "../../Core/truly-native/TNColor";

const dynamicStyles = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: TNColor("#f4f6fb"),
        height: "100%"
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: DynamicAppStyles.colorSet.mainThemeBackgroundColor,
    }
});

export default dynamicStyles;