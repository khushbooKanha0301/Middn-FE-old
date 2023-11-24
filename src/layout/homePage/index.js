import React from "react";
import { Row, Col } from "react-bootstrap";
import Banner from "../../component/Banner";
import LatestsEscrows from "../../component/LatestsEscrows";
import OurOffer from "../../component/OurOffer";
import Sales from "../../component/Sales";
import Statistics from "../../component/Statistics";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <OurOffer />
      <LatestsEscrows />
      <div className="graphs">
        <Row>
          <Col lg="8">
            <Statistics />
          </Col>
          <Col lg="4">
            <Sales />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
