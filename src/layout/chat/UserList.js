import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { userDetails, userGetFullDetails } from "../../store/slices/AuthSlice";
import { setIsChatPage } from "../../store/slices/chatSlice";
import { database, firebaseMessages } from "./config";
import { setUnReadCountZero } from "./firebaseConfig";
import axios from "axios";
import jwtAxios from "../../service/jwtAxios";

export const UserList = (props) => {
  const { setLoader, setReciverId } = props;
  const dispatch = useDispatch();
  const [allusers, setAllUsers] = useState([]);
  const userData = useSelector(userDetails);
  const receiverData = useSelector((state) => state.chatReducer?.MessageUser);
  const usergetdata = useSelector(userGetFullDetails);

  const getChatUser = (user) => {
    dispatch(setIsChatPage({ user: user, isChatOpen: true }));
    window.localStorage.setItem("user", user?.id);
    setReciverId(user?.id);
    if (userData?.account && user?.id) {
      setUnReadCountZero(userData?.account, user?.id);
    }
  };
  useEffect(() => {
    if (receiverData) {
      const latestChanges = allusers.filter(function (e) {
        return (
          e.wallet_address === receiverData.wallet_address)
      })
      if(latestChanges){
        dispatch(setIsChatPage({ user: latestChanges[0], isChatOpen: true }));

      }
    }

  }, [receiverData?.wallet_address, allusers, setAllUsers]);


  useEffect(() => {
    setLoader(true);
    if (userData.authToken) {
      findFirebaseUserList();
    }
  }, [userData.authToken]);

  const getAllFirebaseUser = (userIds) => {
    if (userIds) {
      const starCountRef = ref(database, firebaseMessages.CHAT_USERS);
      onValue(starCountRef, (snapshot) => {
        if (snapshot && snapshot.val()) {
          let rootKey = Object.keys(snapshot.val())
            .filter(function (item) {
              return (
                item !== userData?.account &&
                userIds.find(function (ele) {
                  return ele.id === item;
                })
              );
            })
            .map((object) => {
              let finduser = userIds.find(function (ele) {
                return ele.id === object;
              });

              return {
                ...snapshot.val()[object],
                ...finduser,
              };
            });
          const latestUser = rootKey
            .sort(function (x, y) {
              return x.lastUpdateAt - y.lastUpdateAt;
            })
            .reverse();
          setAllUsers(latestUser);
          setLoader(false);
        } else {
          setLoader(false);
        }
      });
    }
  };

  const findFirebaseUserList = async () => {
    if (userData.authToken) {
      const starCountRef = ref(database, firebaseMessages.CHAT_ROOM);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.val()) {
          const userIds = Object.keys(snapshot.val())
            .filter((element) => {
              return element.includes(userData?.account);
            })
            .map((object) => {
              var name = userData?.account;
              const messages = snapshot.val()[object]?.messages;

              const unreadCount = name
                ? snapshot.val()[object]?.unreadcount
                  ? snapshot.val()[object]?.unreadcount[name]
                  : 0
                : 0;

              const id = object
                .replace(userData?.account + "_", "")
                .replace("_" + userData?.account, "");

              let messageNode = messages[Object.keys(messages).pop()];
              const lastUpdateAt = Object.keys(messages).pop();
              return {
                id: id,
                unreadCount: unreadCount,
                last_message:
                  messageNode && messageNode.file
                    ? messageNode.file?.name
                    : messageNode.message
                      ? messageNode.message
                      : "",
                lastUpdateAt: lastUpdateAt ? lastUpdateAt : 0,
              };
            });
          if (userIds) {
            getAllFirebaseUser(userIds);
          }
        } else {
          setLoader(false);
        }
      });
    }
  };
  return (
    <Col lg="4" className={`${receiverData !== null ? "hide-mobile" : ""}`}>
      <Card className="cards-dark">
        <Card.Body>
          <Card.Title as="h2">Messages</Card.Title>
          <ul className="chat-list alluser-chat">
            <PerfectScrollbar
              options={{ suppressScrollX: true }}
            >
              {allusers &&
                allusers?.map((user, index) => (

                  <li
                    key={index}
                    className={`${user?.id === receiverData?.wallet_address
                      ? "active"
                      : ""
                      }${user?.unreadCount > 0
                        ? "unreaded-msg"
                        : ""
                      }`}
                    onClick={() => getChatUser(user)}
                  >
                    <div className="chat-image">
                      <img
                        src={
                          user?.imageUrl
                            ? user?.imageUrl
                            : require("../../content/images/avatar.png")
                        }
                        alt={user?.fname_alias}
                      />
                      {user?.isOnline === true && <div className="chat-status"></div>}
                    </div>

                    <div>
                      <div>
                        <div className="chat-name">
                          {user?.fname_alias ? user?.fname_alias : null}{" "}
                          {user?.lname_alias ? user?.lname_alias : null}
                        </div>
                      </div>

                      <div>
                        <p>
                          {user?.last_message?.slice(0, 50) +
                            (user?.last_message?.length > 50 ? "..." : "")}
                        </p>
                      </div>
                    </div>
                    {user?.unreadCount > 0 && (
                      <span className="notification-badge-chat">
                        {user?.unreadCount}
                      </span>
                    )}
                  </li>
                ))}
                {allusers.length == 0  && (
                  <li className="active no-message">No Messages yet</li>
                )}
            </PerfectScrollbar>
          </ul>
          
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserList;
