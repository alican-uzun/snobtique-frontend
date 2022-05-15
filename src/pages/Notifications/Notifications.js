import React, { useContext, useEffect } from "react";
import "./Notifications.css";
import Widgets from "../../components/Widgets/Widgets";
import FollowedYou from "../../components/FollowedYou/FollowedYou";
import NewRating from "../../components/NewRating/NewRating";
import HomeBox from "../../components/HomeBox/HomeBox";
import Loading from "../../components/Loading/Loading";
import { NotifiContext } from "../../notifications/NotifiContext";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";

function Notifications() {
  let { notifis, setHaveNewNotifi } = useContext(NotifiContext);
  let { authState } = useContext(AuthContext);
  const [isAll, setIsAll] = React.useState(true);
  document.title = "Notifications / Snobtique";

  useEffect(() => {
    setHaveNewNotifi(false);
    axios.post(
      `https://snobtique.herokuapp.com/api/v1/notification/opened/${authState.user.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authState.tokens.access.token}`,
        },
      }
    );

    return () => {};
  }, []);

  return (
    <HomeBox>
      <div className="feed">
        <div className="notificationsHeader">
          <div className="notificationsTitle">
            <span>Notifications</span>
          </div>
          <div className="notificationsCategory">
            <div
              className={isAll && "notificationActive"}
              onClick={() => setIsAll(true)}
            ></div>
          </div>
        </div>
        <article>
          {notifis.map((v, i) => {
            if (v.type) {
              if (v.type === "rating") {
                return (
                  <NewRating
                    key={i}
                    ratingPost={{
                      id: i,
                      ratingUser: [
                        {
                          username: v.activity_user_id.username,
                          userImage: `https://picsum.photos/20${i}`,
                        },
                      ],
                      post: `${v.song_id.band} / ${v.song_id.name}`,
                    }}
                  />
                );
              } else if (v.type === "follow") {
                return (
                  <FollowedYou
                    key={i}
                    followingUser={{
                      userImage: `https://picsum.photos/20${i}`,
                      username: v.activity_user_id.username,
                    }}
                  />
                );
              }
            } else {
              return null;
            }
          })}
          {!notifis.length > 0 && <Loading />}
        </article>
      </div>
      <Widgets />
    </HomeBox>
  );
}

export default Notifications;