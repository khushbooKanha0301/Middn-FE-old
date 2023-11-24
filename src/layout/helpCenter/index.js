import React from "react";
import { Col, Row, Nav, Card, Tab } from "react-bootstrap";

export const HelpCenter = () => {
    return (
        <div className="help-center-view">
            <h1>Help Center</h1>
            <Tab.Container id="help-center-tabs" defaultActiveKey="create">
                <Row>
                    <Col lg="3">
                        <Card className="cards-dark">
                            <Card.Body>
                                <Nav variant="tabs" defaultActiveKey="all" as="ul" className="flex-column">
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="create">How to create Escrow</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="join">How to join an Escrow</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="spam">Someone spam me</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="Web3">What is Web3</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="KYC">What is KYC used for</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="Scammed">How not to get Scammed</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="9">
                        <Tab.Content>
                            <Tab.Pane eventKey="create">
                                <Card className="cards-dark">
                                    <Card.Header>How to create Escrow</Card.Header>
                                    <Card.Body>
                                        <h4>Step 1</h4>
                                        <p>Start by going to the “Escrow” menu located in the left menu of the application and then clicking on “create“.</p>
                                        <h4>Step 2</h4>
                                        <p>Define the parameters of your escrow by filling in the requested information, this is done in 3 steps.</p>
                                        <ul>
                                            <li>Choose your “seller” or “buyer” status.</li>
                                            <li>Select the amount to receive/send (flexible amount or fixed amount).</li>
                                            <li>Define the title of your escrow and the details related to the escrow, then define the time you take to provide the product/service.</li>
                                        </ul>
                                        <h4>Step 3</h4>
                                        <p>Your escrow link has been successfully created, it can be shared with your customer so they can pay you or get paid (depending on status). The escrow link can be opened directly by direct link or by going to your profile.</p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="join">
                                <Card className="cards-dark">
                                    <Card.Header>How to join an Escrow</Card.Header>
                                    <Card.Body>
                                        <h4>Step 1</h4>
                                        <p>Start by going to the “Escrow” menu located in the left menu of the application and then clicking on “create“.</p>
                                        <h4>Step 2</h4>
                                        <p>Define the parameters of your escrow by filling in the requested information, this is done in 3 steps.</p>
                                        <ul>
                                            <li>Choose your “seller” or “buyer” status.</li>
                                            <li>Select the amount to receive/send (flexible amount or fixed amount).</li>
                                            <li>Define the title of your escrow and the details related to the escrow, then define the time you take to provide the product/service.</li>
                                        </ul>
                                        <h4>Step 3</h4>
                                        <p>Your escrow link has been successfully created, it can be shared with your customer so they can pay you or get paid (depending on status). The escrow link can be opened directly by direct link or by going to your profile.</p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="spam">
                                <Card className="cards-dark">
                                    <Card.Header>Someone spam me</Card.Header>
                                    <Card.Body>
                                        <h4>Step 1</h4>
                                        <p>Start by going to the “Escrow” menu located in the left menu of the application and then clicking on “create“.</p>
                                        <h4>Step 2</h4>
                                        <p>Define the parameters of your escrow by filling in the requested information, this is done in 3 steps.</p>
                                        <ul>
                                            <li>Choose your “seller” or “buyer” status.</li>
                                            <li>Select the amount to receive/send (flexible amount or fixed amount).</li>
                                            <li>Define the title of your escrow and the details related to the escrow, then define the time you take to provide the product/service.</li>
                                        </ul>
                                        <h4>Step 3</h4>
                                        <p>Your escrow link has been successfully created, it can be shared with your customer so they can pay you or get paid (depending on status). The escrow link can be opened directly by direct link or by going to your profile.</p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Web3">
                                <Card className="cards-dark">
                                    <Card.Header>What is Web3</Card.Header>
                                    <Card.Body>
                                        <h4>Step 1</h4>
                                        <p>Start by going to the “Escrow” menu located in the left menu of the application and then clicking on “create“.</p>
                                        <h4>Step 2</h4>
                                        <p>Define the parameters of your escrow by filling in the requested information, this is done in 3 steps.</p>
                                        <ul>
                                            <li>Choose your “seller” or “buyer” status.</li>
                                            <li>Select the amount to receive/send (flexible amount or fixed amount).</li>
                                            <li>Define the title of your escrow and the details related to the escrow, then define the time you take to provide the product/service.</li>
                                        </ul>
                                        <h4>Step 3</h4>
                                        <p>Your escrow link has been successfully created, it can be shared with your customer so they can pay you or get paid (depending on status). The escrow link can be opened directly by direct link or by going to your profile.</p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="KYC">
                                <Card className="cards-dark">
                                    <Card.Header>What is KYC used for</Card.Header>
                                    <Card.Body>
                                        <h4>Step 1</h4>
                                        <p>Start by going to the “Escrow” menu located in the left menu of the application and then clicking on “create“.</p>
                                        <h4>Step 2</h4>
                                        <p>Define the parameters of your escrow by filling in the requested information, this is done in 3 steps.</p>
                                        <ul>
                                            <li>Choose your “seller” or “buyer” status.</li>
                                            <li>Select the amount to receive/send (flexible amount or fixed amount).</li>
                                            <li>Define the title of your escrow and the details related to the escrow, then define the time you take to provide the product/service.</li>
                                        </ul>
                                        <h4>Step 3</h4>
                                        <p>Your escrow link has been successfully created, it can be shared with your customer so they can pay you or get paid (depending on status). The escrow link can be opened directly by direct link or by going to your profile.</p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Scammed">
                                <Card className="cards-dark">
                                    <Card.Header>How not to get Scammed</Card.Header>
                                    <Card.Body>
                                        <h4>Step 1</h4>
                                        <p>Start by going to the “Escrow” menu located in the left menu of the application and then clicking on “create“.</p>
                                        <h4>Step 2</h4>
                                        <p>Define the parameters of your escrow by filling in the requested information, this is done in 3 steps.</p>
                                        <ul>
                                            <li>Choose your “seller” or “buyer” status.</li>
                                            <li>Select the amount to receive/send (flexible amount or fixed amount).</li>
                                            <li>Define the title of your escrow and the details related to the escrow, then define the time you take to provide the product/service.</li>
                                        </ul>
                                        <h4>Step 3</h4>
                                        <p>Your escrow link has been successfully created, it can be shared with your customer so they can pay you or get paid (depending on status). The escrow link can be opened directly by direct link or by going to your profile.</p>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default HelpCenter;
