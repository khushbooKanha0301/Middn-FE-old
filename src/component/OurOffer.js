import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { NotePencilIcon, EscrowIcon, ChartLineUpIcon } from './SVGIcon'
import CreateEscrowView from '../layout/escrow/CreateEscrow';
export const OurOffer = () => {
    const [createEscrowModalShow, setCreateEscrowModalShow] = useState(false);
    const createEscrowModalToggle = () =>
    setCreateEscrowModalShow(!createEscrowModalShow);
    return (
        <div className="our-offer">
            <Row>
                <Col md="4">
                    <Card className="cards-dark">
                        <Card.Body>
                            <div className="icon-bg">
                                <NotePencilIcon width="30" height="30" />
                            </div>
                            <Card.Title as="h5">Create offer</Card.Title>
                            <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Text>
                            <Button variant="primary" onClick={createEscrowModalToggle}>Create Escrow</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="cards-dark">
                        <Card.Body>
                            <div className="icon-bg">
                                <EscrowIcon width="30" height="30" />
                            </div>
                            <Card.Title as="h5">Share Offer</Card.Title>
                            <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="cards-dark">
                        <Card.Body>
                            <div className="icon-bg">
                                <ChartLineUpIcon width="30" height="30" />
                            </div>
                            <Card.Title as="h5">Increase your stats</Card.Title>
                            <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <CreateEscrowView
                show={createEscrowModalShow}
                onHide={() => setCreateEscrowModalShow(false)}
            />
        </div>
    );
}

export default OurOffer;
