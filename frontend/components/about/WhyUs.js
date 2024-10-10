import { whyUsData } from "@/data/aboutData";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./style.css";

const WhyUs = () => {
  return (
    <div className="why-us">
      <div className="why-us-title">
        <h3>Why Choosing Us</h3>
      </div>
      <Row>
        {whyUsData.map((item, index) => (
          <Col key={index}>
            <div className="why-us-card">
              <div className="why-us-icon">
                <item.icon></item.icon>
              </div>
              <h4>{item.title}</h4>
              <p>{item.details}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WhyUs;
