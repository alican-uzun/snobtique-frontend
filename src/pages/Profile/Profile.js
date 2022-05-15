import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import Post from "../../components/Feed/Post/Post";

import BackIcon from "@material-ui/icons/KeyboardBackspace";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import HomeBox from "../../components/HomeBox/HomeBox";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../auth/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Widgets from "../../components/Widgets/Widgets";
import Follow from "./Follow";

const Profile = () => {
  let { authState } = useContext(AuthContext);
  let { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [random] = useState(() => {
    return (Math.random() * 10).toFixed(0);
  });

  const getUser = async (id) => {
    await axios
      .get(`https://snobtique.herokuapp.com/api/v1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${authState.tokens.access.token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  const getFeed = (id) => {
    axios
      .get(`https://snobtique.herokuapp.com/api/v1/user/feed/${id}`, {
        headers: {
          Authorization: `Bearer ${authState.tokens.access.token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      getUser(id);
      getFeed(id);
    } else {
      setUser(authState.user);
      getFeed(authState.user.id);
    }
  }, [id]);

  const [category, setCategory] = React.useState(1);
  let history = useHistory();
  document.title = `${authState.user.username} / Snobtique`;
  return user ? (
    <HomeBox>
      <section className="feed">
        <div className="profileHeader">
          <div onClick={() => history.goBack()}>
            <BackIcon />
          </div>
        </div>
        <div className="profile">
          <div className="profileTitle">
            <div className="profileImage">
              <Avatar src={`https://picsum.photos/20${random}`} />
            </div>
          </div>
          <div>
            <div className="profileBiography">
              <span>{user.username}</span>
            </div>
            <div>
              <div className="follow">
                {console.log(authState.user)}
                {id && id !== authState.user.id && <Follow />}
              </div>
              <div className="follow-info">
                <span>
                  <span>{user.following.length}</span>
                  <span>Following</span>
                </span>
                <span>
                  <span>{user.point}</span>
                  <span>Points</span>
                </span>
                <span>
                  <span className="memberBadge">
                    {" "}
                    {user.point > 100 ? "Premium" : "Member"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="profileCategory">
          <div
            className={category === 1 && "profileCategoryActive"}
            onClick={() => setCategory(1)}
          >
            <span>Snobtique</span>
          </div>
        </div>
        <article className="profilePosts">
          {!loading ? (
            posts.map((post, i) => (
              <Post key={post.id} post={post} i={random} />
            ))
          ) : (
            <Loading />
          )}
        </article>
      </section>
      <Widgets />
    </HomeBox>
  ) : (
    <p>Loading Or Error</p>
  );
};

export default Profile;
