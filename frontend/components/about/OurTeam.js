import React from "react";
import "./style.css";
import { ourTeamData } from "@/data/aboutData";
import { Col, Row } from "react-bootstrap";

const OurTeam = () => {
  return (
    <div className="our-team">
      <div className="our-team-title">
        <h3>Our Team</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      </div>
      <Row>
        {ourTeamData.map((item, index) => (
          <Col key={index}>
            <div className="our-team-card">
              <div className="our-team-image">
                {/* <Image src={item.image} width={376} height={376}/> */}
              </div>
              <div className="our-team-details">
                <h4>{item.title}</h4>
                <p>{item.designation}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OurTeam;
