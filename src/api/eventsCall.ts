export default async function getEvents(input: String):Promise<JSON> {
    const data = await fetch(`https://api.github.com/users/${input}/events`);
    const dataJSON = await data.json();
    //console.log(dataJSON);
    return dataJSON;
}
