import React from "react";
import { Card, Button } from "react-bootstrap";
import { userDetails, userGetFullDetails } from "../store/slices/AuthSlice";
import { useSelector } from "react-redux";
export const Banner = () => {
  const userData = useSelector(userDetails);
  const authed = userData.authToken
  const userDetailsAll = useSelector(userGetFullDetails);
  
  let cardTitle = "";
  let cardText = "";
  if(userData.account === "Connect Wallet" && userDetailsAll === undefined)
  {
    cardTitle = "Time to build your reputation";
    cardText = `Customize your profile and start sharing it, We secure the rest,
    your customers will love it`;
  }
  // else if(userData.account !== "Connect Wallet" && userDetailsAll === undefined)
  // {
  //   cardTitle = "";
  //   cardText = "";
  // }
  // else if(userData.account !== "Connect Wallet" && userDetailsAll?.is_2FA_login_verified !== false && (userData.account == userDetailsAll?.wallet_address))
  // {
  //   cardTitle = "Begin building your reputation.";
  //   cardText = `A whole new experience for trading.
  //   Show everyone that you are a trustworthy person.`;
  // }
  else{
    // cardTitle = "Time to build your reputation";
    // cardText = `Customize your profile and start sharing it, We secure the rest,
    // your customers will love it`;
    cardTitle = "Begin building your reputation.";
    cardText = `A whole new experience for trading.
    Show everyone that you are a trustworthy person.`;
  }
  return (
    <Card className="cards-dark banner">
      <Card.Body>
        <div className="banner-contain">
          {cardTitle && <Button variant="primary">Mkoon App</Button>}
            <Card.Title as="h1">{cardTitle}</Card.Title>
            <Card.Text>
              {cardText}
            </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Banner;
