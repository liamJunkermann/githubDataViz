async function getFollowingCall(input: String) {
    const following = await fetch(
        `https://api.github.com/users/${input}/following`
    );
    const followingJSON = await following.json();
    return followingJSON;
}

export default getFollowingCall;
