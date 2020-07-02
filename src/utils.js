export const isDatingProfileCompleteForUser = (user) => {
    return (
        user.profilePictureURL &&
        user.profilePictureURL.length > 0 &&
        // user.age &&
        // user.gender &&
        // user.genderPreference &&
        user.firstName
    );
}