import * as React from "react";
import "./App.css";
import * as api from "./api";
import LanguageChart from "./components/LanguageChart";
import UserCard from "./components/UserCard";

function App() {
  const [user, setUser] = React.useState("liamJunkermann");
  const [disInp, setDisplayInput] = React.useState("");
  const [repo, setRepo] = React.useState<string | any>("");
  const [info, setInfo] = React.useState({});
  const [languages, setLangs] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getData(): Promise<void> {
    setUser(user);
    let userData = await api.getProfileInfo(user);
    if (userData.message) {
      alert("User not found");
    } else {
      setInfo(userData);
      setFollowers(await api.getFollowers(user));
      setFollowing(await api.getFollowingCall(user));
      let returnedRepos = await api.getRepos(user);
      if (returnedRepos.length > 0) {
        setRepos(returnedRepos);
        setRepo(returnedRepos[0]);
        let langData = await api.getLangs(user, returnedRepos[0].name);
        setLangs(langData);
      }
      // let eventsRes = await getEventsCall(input);
      // setEvents(eventsRes);
    }
    checkReqLimit();
  }

  async function updateDisplayedRepoData(repo: any) {
    if (repo) {
      setRepo(repo);
      if (repos.length > 0) {
        let langData = await api.getLangs(user, repo.name);
        setLangs(langData);
      }
    }
    console.log(repo.description);
    checkReqLimit();
  }

  const checkReqLimit = async () => {
    let remaining = await api.getRateLimit();
    if (remaining === 0) alert(`${remaining} API calls left`);
    else if (remaining < 10)
      alert(`Running low on API calls! ${remaining} calls left`);
  };

  const handleInput = (e: any) => {
    setUser(e.target.value);
    setDisplayInput(e.target.value);
  };

  const handleSearch = async () => {
    if (user !== "") {
      getData();
    }
    setDisplayInput("");
  };

  const checkIfEnter = (pressedKey: { key: string }) => {
    if (pressedKey.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="main">
      <div className="nav-bar">
        <div className="nav-header">Github Dataviz</div>
      </div>
      <div className="user-div">
        <div className="columns is-variable is-1">
          <div className="column is-one-quarter">
            <div className="shadow-div">
              <div className="search-div">
                <input
                  id="userInput"
                  className="input is-small"
                  type="text"
                  value={disInp}
                  placeholder="Username"
                  onChange={handleInput}
                  onKeyPress={checkIfEnter}
                />
                <button className="button is-small" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            <div className="vert-spacer-div"></div>
            <div className="shadow-div">
              <UserCard userInfo={info} />
            </div>
            <div className="vert-spacer-div"></div>
            <div className="shadow-div">
              <div className="column">
                <p className="title">Followers</p>
                <div>
                  {followers.map((follower: any) => (
                    <button
                      className="button is-small"
                      onClick={() => {
                        setUser(follower.login);
                        getData();
                      }}
                    >
                      {follower.login}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="column is-one-fifth">
            <div className="shadow-div">
              <div className="column">
                <p className="title">Repos</p>
                <div>
                  {repos.map((x: any) => (
                    <div key={x.name}>
                      <button
                        className="list-button"
                        onClick={() => {
                          updateDisplayedRepoData(x);
                        }}
                      >
                        {x.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="vert-spacer-div"></div>
            <div className="shadow-div">
              <div className="column">
                <p className="title">Following</p>
                <div>
                  {following.map((person: any) => (
                    <button
                      className="button is-small"
                      onClick={() => {
                        setUser(person.login);
                      }}
                    >
                      {person.login}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="shadow-div">
              <div className="column">
                <p className="title">Repo: {repo.name}</p>
                <p>Description: {repo.description}</p>
              </div>
            </div>
            <div className="vert-spacer-div"></div>
            <div className="shadow-div">
              <LanguageChart langs={languages} />
            </div>
            <div className="vert-spacer-div"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
