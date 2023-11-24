import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { BackArrow, LinkSimpleIcon, SmileyIcon } from "../../component/SVGIcon";
import { userGetFullDetails } from "../../store/slices/AuthSlice";
import { setIsChatPage } from "../../store/slices/chatSlice";
import ChatLoader from "./ChatLoader";
import { messageTypes } from "./config";
import { converImageToBase64, sendMessage } from "./firebaseConfig";
import MessageList from "./MessageList";
import { formateSize, RenderIcon } from "./RenderIcon";
import UserList from "./UserList";
import { notificationFail } from "../../store/slices/notificationSlice";

export const Chat = () => {
  const [userName, setUserName] = useState(null);
  const userDetailsAll = useSelector(userGetFullDetails);
  const [messages, setMessages] = useState([]);
  const [showSmily, setShowSmily] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageFile, setMessageFile] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState([]);
  const emojiPickerRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const receiverData = useSelector((state) => state.chatReducer?.MessageUser);
  const [ReciverId, setReciverId] = useState(null);

  var scrollBottom = document.getElementById("scrollBottom");

  useEffect(() => {
    window.localStorage.removeItem("user");
    dispatch(setIsChatPage({ user: null, isChatOpen: true }));
  }, []);

  useEffect(() => {
    if (ReciverId) {
      setMessageText("");
    }
  }, [ReciverId]);
  const smilyOpen = () => {
    setShowSmily(!showSmily);
  };
  const ref = useRef(null);
  const { onClickOutside } = <Picker />;

  const handleTextChange = (event) => {
    setMessageText(event.target.value);
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = async () => {
    fileInputRef.current.click();
  };

  const handleFileSelection = async (event) => {
    const selectedFile = event.target.files[0];
    setMessageFile(selectedFile);
  };

  const handleDeselctImage = () => {
    setMessageFile("");
  };

  const onEmojiClick = (emojiData, event) => {
    const emoji = emojiData.emoji;
    setMessageText(`${messageText}${emoji}`);
    const selectedIndex = selectedEmoji.indexOf(emoji);
    if (selectedIndex === -1) {
      setSelectedEmoji([...selectedEmoji, emoji]);
    } else {
      const updatedSelectedEmojis = [...selectedEmoji];
      updatedSelectedEmojis.splice(selectedIndex, 1);
      setSelectedEmoji(updatedSelectedEmojis);
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      const input = event.target;
      const newText = input.value.trim();
      if (newText !== "") {
        const selectedEmojisText = selectedEmoji.join("");
        const updatedText = `${messageText} ${selectedEmojisText} ${newText}`;
        setSelectedEmoji([]);
        input.value = updatedText.trim();
      }
    }
  };

  const handleBack = () => {
    window.localStorage.removeItem("user");
    dispatch(setIsChatPage({ user: null, isChatOpen: true }));
  };

  useEffect(() => {
    if (scrollBottom) {
      scrollBottom.scrollTop = scrollBottom.scrollHeight;
    }
  }, [messages]);

  const handleInputFocus = (event) => {
    event.target.removeAttribute("placeholder");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowSmily(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const messageText = e.target.elements?.content.value;
    let noError = true;
    const array_of_allowed_files = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "tiff",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "odt",
      "rtf",
      "mp3",
      "wav",
      "aiff",
      "aac",
      "mp4",
      "avi",
      "mov",
      "wmv",
    ];

    // Check if the uploaded file is allowed
    let file = {};
    if (messageFile) {
      const file_extension = messageFile.name.slice(
        ((messageFile.name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      if (!array_of_allowed_files.includes(file_extension)) {
        noError = false;
        dispatch(notificationFail("Inappropriate file type"));
      } else {
        const allowed_file_size = 5;
        if (file.size / (1024 * 1024) > allowed_file_size || file.size < 1) {
          noError = false;
        } else {
          noError = true;
          let base64 = await converImageToBase64(messageFile);
          file = {
            name: messageFile?.name,
            size: messageFile?.size,
            type: messageFile?.type,
            url: base64,
          };
        }
      }
    }
    if (messageText !== "" || messageFile !== "" || !file) {
      if (
        userDetailsAll?.wallet_address &&
        receiverData?.wallet_address &&
        noError == true
      ) {
        sendMessage(
          messageText,
          userDetailsAll?.wallet_address,
          receiverData?.wallet_address,
          messageFile ? messageTypes.ATTACHMENT : messageTypes.TEXT,
          file
        );
        // e.target.elements.content.value = "";
        setMessageFile("");
        setMessageText("");
      } else {
        ///token check
      }
    }
  };
  return (
    <div className="chat-view">
      {loader ? (
        <ChatLoader username={userName} />
      ) : (
        <Row>
          <UserList setLoader={setLoader} setReciverId={setReciverId} />
          <Col
            lg="8"
            className={`${receiverData !== null ? "show-mobile" : ""}`}
          >
            <Card className="cards-dark chat-box">
              <Card.Body>
                <div className="d-flex items-center justify-content-between pe-4">
                  <Card.Title as="h2">
                    <Button
                      variant="primary"
                      type="button"
                      className="back-button"
                      onClick={handleBack}
                    >
                      <BackArrow width={16} height={16} />
                    </Button>
                    Chatbox
                  </Card.Title>
                  <p className="text-white">
                    {receiverData &&
                      `${receiverData?.fname_alias}  ${receiverData?.lname_alias}`}
                  </p>
                </div>
                <div className="chat-box-list">
                  <ul>
                    {receiverData ? (
                      <MessageList ReciverId={ReciverId} />
                    ) : (
                      <div className="no-chat-msg">No Messages yet...</div>
                    )}
                  </ul>
                  {showSmily && (
                    <div ref={emojiPickerRef} className="emoji-picker">
                      <Picker
                        onEmojiClick={onEmojiClick}
                        autoFocusSearch={true}
                        className="emoji-popup"
                        theme="dark"
                        lazyLoadEmojis={true}
                      />
                    </div>
                  )}

                  <div
                    className="chat-action"
                    style={{ visibility: receiverData ? "visible" : "hidden" }}
                  >
                    {messageFile && (
                      <div className="attach">
                        <div className="flex items-center justify-between px-2 py-1  border rounded-full shadow-md fileClass">
                          <div className="flex items-center space-x-2">
                            {RenderIcon(messageFile.name)}
                            <span className=" truncate">
                              {messageFile.name}
                            </span>
                            <IoIosCloseCircle
                              style={{ fontSize: "25px", marginLeft: "14px" }}
                              onClick={handleDeselctImage}
                            />
                            <div className="file-size">
                              {messageFile?.size &&
                                formateSize(messageFile?.size)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="messsge">
                      <div className="button-container">
                        <Button variant="link" onClick={() => smilyOpen()}>
                          <SmileyIcon width="20" height="20" />
                        </Button>
                        <Button
                          variant="link"
                          className="ms-3"
                          onClick={handleButtonClick}
                        >
                          <LinkSimpleIcon width="20" height="20" />
                        </Button>
                      </div>

                      <Form
                        className="input-container"
                        onSubmit={(e) => {
                          onSubmit(e);
                        }}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileSelection}
                          style={{ display: "none" }}
                        />

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Send a message…"
                          name="content"
                          value={messageText}
                          onChange={handleTextChange}
                          onKeyPress={handleInputKeyPress}
                          onFocus={handleInputFocus}
                          autoComplete="off"
                        />

                        <Button variant="primary" type="submit" size="sm">
                          Send
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Chat;
