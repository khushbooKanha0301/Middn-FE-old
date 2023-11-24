import React from 'react'
import { Card, Col, Placeholder, Row } from 'react-bootstrap'

const ChatLoader = (props) => {
  return (
    <Row>
    <Col lg="4">
        <Card className="cards-dark">
            <Card.Body>
                <Card.Title as="h2">Messages</Card.Title>
                <div className="placehoder-scroll">
                <Placeholder as="div" animation="wave">
                    <div className="msg-profile-list with-bg">
                        <Placeholder className="skeleton profile-img-skeleton" />
                        <Placeholder className="skeleton profile-name-skeleton" />
                    </div>
                </Placeholder>
                <Placeholder as="div" animation="wave">
                    <div className="msg-profile-list">
                        <Placeholder className="skeleton profile-img-skeleton" />
                        <Placeholder className="skeleton profile-name-skeleton" />
                    </div>
                </Placeholder>
                <Placeholder as="div" animation="wave">
                    <div className="msg-profile-list">
                        <Placeholder className="skeleton profile-img-skeleton" />
                        <Placeholder className="skeleton profile-name-skeleton" />
                    </div>
                </Placeholder>
                <Placeholder as="div" animation="wave">
                    <div className="msg-profile-list">
                        <Placeholder className="skeleton profile-img-skeleton" />
                        <Placeholder className="skeleton profile-name-skeleton" />
                    </div>
                </Placeholder>
                </div>
            </Card.Body>
        </Card>
    </Col>
    <Col lg="8">
        <Card className="cards-dark chat-box">
            <Card.Body>
                <div className="d-flex items-center justify-content-between pe-4">
                    <Card.Title as="h2">Chatbox</Card.Title>
                    <p className="text-white">{}</p>
                </div>
                <div className="chat-box-list chat-box-placeholder red">
                    <div className="my-2">
                        <div className="right">
                            <Placeholder
                                as="p"
                                animation="wave"
                                className="placeholder-container"
                            >
                                <Placeholder className="chat-profile-img" />
                                <Placeholder className="right-chat" />
                            </Placeholder>
                        </div>
                        <div className="left">
                            <Placeholder
                                as="p"
                                animation="wave"
                                className="placeholder-container"
                            >
                                <Placeholder className="left-chat" />
                            </Placeholder>
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="right">
                            <Placeholder
                                as="p"
                                animation="wave"
                                className="placeholder-container"
                            >
                                <Placeholder className="chat-profile-img" />
                                <Placeholder className="right-chat" />
                            </Placeholder>
                        </div>
                        <div className="left">
                            <Placeholder
                                as="p"
                                animation="wave"
                                className="placeholder-container"
                            >
                                <Placeholder className="left-chat" />
                            </Placeholder>
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="right">
                            <Placeholder
                                as="p"
                                animation="wave"
                                className="placeholder-container"
                            >
                                <Placeholder className="chat-profile-img" />
                                <Placeholder className="right-chat" />
                            </Placeholder>
                        </div>
                        <div className="left">
                            <Placeholder
                                as="p"
                                animation="wave"
                                className="placeholder-container"
                            >
                                <Placeholder className="left-chat" />
                            </Placeholder>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </Col>
</Row>
  )
}

export default ChatLoader
