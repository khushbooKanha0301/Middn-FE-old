import React, { useRef } from 'react';
import { Col, Row, Card, Nav, OverlayTrigger, Tooltip, Button, Accordion, Form } from "react-bootstrap";
import { CheckIcon, SimpleDotedIcon, SimpleTrashIcon, TrashIcon } from "../../component/SVGIcon";
import PerfectScrollbar from "react-perfect-scrollbar";
export const AccountSetting = () => {
    const ref = useRef(null);
    return (
        <div className="notification-view">
            <Row>
                <Col lg="3">
                    <Card className="cards-dark mb-32">
                        <Card.Body>
                            <Card.Title as="h2">Notification</Card.Title>
                            <Nav variant="tabs" defaultActiveKey="all" as="ul" className="flex-column">
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="all"><span>All</span><span className="notification-count">0</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="activities"><span>Activities</span><span className="notification-count">0</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="trade"><span>Trade Notification</span><span className="notification-count">0</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="system"><span>System Messages</span><span className="notification-count">0</span></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="9">
                    <div className="notification-list">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Notification</h2>
                            <div className="btn-action-group" ref={ref}>
                                <OverlayTrigger placement="top" container={ref} overlay={<Tooltip id="tooltip-check">Mark all as read</Tooltip>}>
                                    <Button variant="dark"><CheckIcon width="25" height="18" /></Button>
                                </OverlayTrigger>
                                <Button variant="dark"><TrashIcon width="35" height="35" /></Button>
                                <OverlayTrigger placement="bottom right" container={ref} overlay={<Tooltip id="tooltip-more"><SimpleTrashIcon width="20" height="20" /> Clear all</Tooltip>}>
                                    <Button variant="dark"><SimpleDotedIcon width="25" height="4" /></Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <Accordion defaultActiveKey="0">
                            <PerfectScrollbar options={{ suppressScrollX: true }}>
                                <Accordion.Item eventKey="0">
                                    <div className="accordion-body">
                                        <div className="accordion-title">
                                            <h5>No Notification yet</h5>
                                            <div className="notification-time"></div>
                                        </div>
                                        <span className="accordion-text no-notification">There's no notification yet</span>
                                    </div>
                                </Accordion.Item>
                                
                            </PerfectScrollbar>
                        </Accordion>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AccountSetting;
