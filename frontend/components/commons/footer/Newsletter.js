import React from "react";
import Images from "next/image";
import "./style.css";
import Container from "@/components/container/Container";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <Container>
        <div className="newsletter-wrapper">
          <div className="newsletter-details">
            <div>
              <Images
                src="/Newsletter.svg"
                width={96}
                height={96}
                alt="newsletter"
              />
            </div>
            <div className="newsletter-title">
              <h4>Join our newsletter now!</h4>
              <p>Register now and get our latest updates and promos.</p>
            </div>
          </div>
          <div className="newsletter-input">
            <input type="text" placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Newsletter;
