async function getProfileInfo(input: String) {
  const data = await fetch(`https://api.github.com/users/${input}`);
  const dataJSON = await data.json();
  //console.log(dataJSON);
  return dataJSON;
}

export default getProfileInfo;
