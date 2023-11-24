import { Card } from "react-bootstrap";
import {
  CheckmarkIcon,
  IdentificationCardIcon,
  MapPinIcon,
  UserFocusIcon,
  UserListIcon,
} from "../../component/SVGIcon";

export const VerifiedInfo = () => {
  return (
    <Card className="cards-dark">
      <Card.Body>
        <Card.Title as="h2">Verified</Card.Title>
        <ul className="verified">
          <li>
            <div className="verified-step">
              <UserListIcon width="25" height="24" />
              <p>Personal information</p>
            </div>
            <div className="checkmark">
              <CheckmarkIcon width="10" height="8" />
            </div>
          </li>
          <li>
            <div className="verified-step">
              <IdentificationCardIcon width="24" height="24" />
              <p>Goverment-issued ID</p>
            </div>
            <div className="checkmark">
              <CheckmarkIcon width="10" height="8" />
            </div>
          </li>
          <li>
            <div className="verified-step">
              <UserFocusIcon width="24" height="24" />
              <p>Facial recognition</p>
            </div>
            <div className="checkmark">
              <CheckmarkIcon width="10" height="8" />
            </div>
          </li>
          <li>
            <div className="verified-step">
              <MapPinIcon width="24" height="24" />
              <p>Proof Location</p>
            </div>
            <div className="checkmark">
              <CheckmarkIcon width="10" height="8" />
            </div>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};
export default VerifiedInfo;
