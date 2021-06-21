import { IMLocalized } from "../../localization/IMLocalization";

const FriendshipType = {
    none: 'none',
    inbound: 'inbound',
    outbound: 'outbound',
    reciprocal: 'reciprocal',
};

const localizedActionTitle = (friendshipType) => {
    switch (friendshipType) {
        case FriendshipType.none:
            return IMLocalized("Add")
        case FriendshipType.inbound:
            return IMLocalized("Accept")
        case FriendshipType.outbound:
            return IMLocalized("Cancel")
        case FriendshipType.reciprocal:
            return IMLocalized("Unfriend")
    }
    return null;
}

export const FriendshipConstants = {
    localizedActionTitle,
    FriendshipType
};
