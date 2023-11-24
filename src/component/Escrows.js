import React from 'react';
import { Col } from 'react-bootstrap';
export const Escrows = (props) => {
    return (
        <Col className={`${props.classlist > 1 ? 'col-fixed' : ''}`}>
            <div className="escrows-item">
                <div className="escrows-image">
                    <img src={props.imgsrc} alt='escrows' />
                    <span className="escrows-staus"></span>
                </div>
                <div className="escrows-name">{props.name}</div>
                <div className="escrows-time">{props.time}</div>
            </div>
        </Col>
    );
}

export default Escrows;
