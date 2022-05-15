import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import HomeBox from "../../components/HomeBox/HomeBox";
import Loading from "../../components/Loading/Loading";
import Widgets from "../../components/Widgets/Widgets";
function Home() {

  let { authState } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://snobtique.herokuapp.com/api/v1/song/filter?sortBy=rating:desc&limit=50",
        {
          headers: {
            Authorization: `Bearer ${authState.tokens.access.token}`,
          },
        }
      )
      .then((res) => {
        setSongs(res.data.results);
        setLoading(false);
      });
  }, []);

  function fetchSongs(e) {
    
    setSelected(e.target.value);
    
    e.preventDefault();
    axios
    .get(
      e.target.value === 'Overall' ? "https://snobtique.herokuapp.com/api/v1/song/filter?sortBy=rating:desc&limit=50" :
      "https://snobtique.herokuapp.com/api/v1/song/filter?tag=" + e.target.value + "&sortBy=rating:desc&limit=50",
      {
        headers: {
          Authorization: `Bearer ${authState.tokens.access.token}`,
        },
      }
    )
    .then((res) => {
      setSongs(res.data.results);
      setLoading(false);
    });
}

  return (
    <HomeBox>
      <section className="feed">
        <div className="feed-header">
          <div className="feed-headerText">
            <span>
              <h1>
                <center>Top 50</center>
              </h1>
            </span>
          </div>
        </div>
        <div style={{height: '60px', background: '#fff', display: 'flex', flexDirection: 'row'}}>
          <button className="overallButton" type="button" value='Overall' style={{flex: 1, height: '100%', border: '1px solid #00ADB5', color: selected === 'Overall' || selected == '' ? '#00ADB5' : '#EEEEEE', textAlign: 'center', fontSize: '24px', fontWeight: 600, backgroundColor:"#222831", cursor: "pointer"}} onClick={fetchSongs}>Overall</button>
          <button className="rockButton" type="button" value='Rock' style={{flex: 1, height: '100%', border: '1px solid #00ADB5', color: selected === 'Rock' ? '#00ADB5' : '#EEEEEE', textAlign: 'center', fontSize: '24px', fontWeight: 600, backgroundColor:"#222831", cursor: "pointer"}} onClick={fetchSongs}>Rock</button>
          <button className="rapButton" type="button" value='Rap' style={{flex: 1, height: '100%', border: '1px solid #00ADB5', color: selected === 'Rap' ? '#00ADB5' : '#EEEEEE', textAlign: 'center', fontSize: '24px', fontWeight: 600, backgroundColor:"#222831", cursor: "pointer"}} onClick={fetchSongs}>Rap</button>
          <button className="popButton" type="button" value='Pop' style={{flex: 1, height: '100%', border: '1px solid #00ADB5', color: selected === 'Pop' ? '#00ADB5' : '#EEEEEE', textAlign: 'center', fontSize: '24px', fontWeight: 600, backgroundColor:"#222831", cursor: "pointer"}} onClick={fetchSongs}>Pop</button>
        </div>
        <article>
          {loading ? (
            <Loading />
          ) : (
            songs.map((v, i) => {
              return (
                <div className="post" key={i}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <span
                      style={{
                        minWidth: "50px",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      #{i + 1}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        minWidth: "50px",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {v.name}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        {v.band}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        {v.album}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </article>
      </section>
      <Widgets />
    </HomeBox>
  );
}

export default Home;
