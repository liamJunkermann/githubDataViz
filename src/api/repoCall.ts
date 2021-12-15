async function getRepos(input: String) {
    const data = await fetch(`https://api.github.com/users/${input}/repos`);
    const dataJSON = await data.json();
    //console.log(dataJSON);
    return dataJSON;
}

export default getRepos;
