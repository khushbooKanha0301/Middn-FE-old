import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Escrows } from "./Escrows";
import { DotedIcon } from "./SVGIcon";
import { PlusIcon } from "./SVGIcon";
import CreateEscrowView from "../layout/escrow/CreateEscrow";

const escrows = [
  {
    id: "1",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-1.png"),
    time: "14m ago",
  },
  {
    id: "2",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-2.png"),
    time: "14m ago",
  },
  {
    id: "3",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-3.png"),
    time: "14m ago",
  },
  {
    id: "4",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-4.png"),
    time: "14m ago",
  },
  {
    id: "5",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-5.png"),
    time: "14m ago",
  },
  {
    id: "6",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-6.png"),
    time: "14m ago",
  },
  {
    id: "7",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-1.png"),
    time: "14m ago",
  },

  {
    id: "8",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-2.png"),
    time: "14m ago",
  },
  {
    id: "9",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-3.png"),
    time: "14m ago",
  },
  {
    id: "10",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-4.png"),
    time: "14m ago",
  },
  {
    id: "11",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-5.png"),
    time: "14m ago",
  },
  {
    id: "12",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-6.png"),
    time: "14m ago",
  },
  {
    id: "13",
    name: "Gabriel Erickson",
    img: require("../content/images/escrows-1.png"),
    time: "14m ago",
  },
];

function getWidth() {
  let width = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
  if (width > 1200) {
    width = 1440;
  }

  return width;
}

let divSize = 0;

export const LatestsEscrows = () => {
  let width = getWidth();

  let userDisplayCal = width / 225;
  const [escrowslist, setescrowslist] = React.useState(0);
  const [userDisplayCount, setDisplayCount] = React.useState(userDisplayCal);
  const [userList, setUserList] = React.useState(
    escrows.filter((item, index) => index < userDisplayCount)
  );
  const loadMoreData = () => {
    setUserList(escrows);
    setescrowslist(escrows.length);
  };

  const handleResize = () => {
    let width = getWidth();
    let userDisplayCalChange = width / 225;
    divSize = width;

    setTimeout(() => {
      if (
        divSize === width &&
        Math.trunc(userDisplayCalChange) !== Math.trunc(userDisplayCount)
      ) {
        setDisplayCount(userDisplayCalChange);
        setUserList(
          escrows.filter((item, index) => index < userDisplayCalChange)
        );
      }
    }, 500);
  };

  const createEscrowModalToggle = () =>
    setCreateEscrowModalShow(!createEscrowModalShow);
  const [createEscrowModalShow, setCreateEscrowModalShow] = useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <>
      <Card className="cards-dark latests-escrows">
        <Card.Body className="no-escrows">
          <Card.Title as="h2" className="font-family-poppins">
            Your Latests Escrows
          </Card.Title>
          <Row>
            <Col className="col-auto">
              <Button variant="link"onClick={createEscrowModalToggle} >
                <span className="see-more ms-0">
                  <PlusIcon width="34" height="26" />
                </span>
                <span className="create-escrow-text">Create Escrow</span>
              </Button>

              <Button variant="link">
                <span className="see-more">
                  <DotedIcon width="34" height="26" />
                </span>
                See more
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <CreateEscrowView
          show={createEscrowModalShow}
          onHide={() => setCreateEscrowModalShow(false)}
      />
    </>
  );
};

export default LatestsEscrows;
