import React from "react";
import styled from "styled-components";

import Onboarding1 from "./icons/onboarding-1.svg";
import Onboarding2 from "./icons/onboarding-2.svg";
import Onboarding3 from "./icons/onboarding-3.svg";
import Point1 from "./icons/point-1.svg";
import Point2 from "./icons/point-2.svg";
import Arrow from "./icons/arrow.svg";

import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  z-index: 1000;
`;

const SubTitle = styled.h6`
  color: #706f6c;
`;

const Title = styled.h4`
  color: #1b1b18;
  font-weight: 700;
`;

const Tag = styled.div`
  border: 1px solid #e3e3e0;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
  margin-right: 10px;
  color: #706f6c;
  font-size: 12px;

  img {
    margin: -4px 4px 0 0;
  }
`;

const Desc = styled.div`
  margin-top: 30px;
`;

const Point = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
  }

  .desc {
    padding-top: 4px;
    font-weight: 450;
    font-size: 14px;
    line-height: 150%;
    color: #706f6c;
  }

  .img {
    margin-right: 24px;
  }
`;

const ButtonGetStarted = styled.button`
  margin-top: 60px;
  width: 100%;
  height: 48px;
  background: #63e3a4;
  border: 0.5px solid #37cd83;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  text-align: center;

  :hover {
    opacity: 0.9;
  }
`;

const ButtonSkip = styled.button`
  all: unset;
  margin-top: 20px;
  width: 100%;
  height: 48px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #706f6c;

  :hover {
    color: #000;
  }
`;

export default ({ handleNext }) => {
  // TODO move to somewhere cleaner
  const history = useHistory();
  return (
    <Wrapper>
      <div className={`d-flex min-vh-100 `}>
        <div
          className="container-fluid mt-5"
          style={{
            width: "500px",
          }}
        >
          <SubTitle>Getting Started</SubTitle>
          <Title>Build with Open Web Components</Title>
          <div className="d-flex">
            <Tag>
              <img src={Point1} /> Beginner Friendly
            </Tag>
            <Tag>
              <img src={Point2} /> 5 min
            </Tag>
          </div>
          <Desc>
            We’ll guide you through a basic development workflow to fork,
            modify, and compose with open web components.
          </Desc>
          <Point>
            <div className="img">
              <img src={Onboarding1} />
            </div>
            <div>
              <div className="title">Develop with the NEAR Sandbox </div>
              <div className="desc">
                Inspect components, compose applications, and preview your
                changes in real time.
              </div>
            </div>
          </Point>
          <Point>
            <div className="img">
              <img src={Onboarding2} />
            </div>
            <div>
              <div className="title">Compose with Components</div>
              <div className="desc">
                Discover components built by the community and embed them within
                your project.
              </div>
            </div>
          </Point>
          <Point>
            <div className="img">
              <img src={Onboarding3} />
            </div>
            <div>
              <div className="title">
                Publish Your First Components On-Chain{" "}
              </div>
              <div className="desc">
                Build a contribution graph, deploy it on chain, and connect with
                thousands of other builders on BOS!
              </div>
            </div>
          </Point>
          <div>
            <ButtonGetStarted onClick={handleNext}>
              Get Started <img src={Arrow} />
            </ButtonGetStarted>
            <ButtonSkip
              onClick={() => {
                history.push("/signup");
              }}
            >
              Skip and Create an Account
            </ButtonSkip>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
