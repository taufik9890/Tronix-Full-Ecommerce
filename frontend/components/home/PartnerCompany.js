import React from "react";
import "./style.css";
import { company } from "@/data/homeData";

const PartnerCompany = () => {
  return (
    <div className="company-part">
      <div className="company-item">
        {company.map((item, i) => (
          <div key={i}>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCompany;
