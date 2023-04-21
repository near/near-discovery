import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Filetype, ModalTypes } from "../utils/const";

import Point1 from "../OnBoarding/icons/point-1.svg";
import Point2 from "../OnBoarding/icons/point-2.svg";
import Arrow from "../OnBoarding/icons/arrow.svg";

const ButtonGetStarted = styled.button`
  margin-top: 20px;
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

  &.outlined {
    background: #fff;
    border: 0.5px solid #37cd83;
  }
`;

const Title = styled.h4`
  color: #1b1b18;
  font-weight: 700;

  &.second {
    margin-top: 80px;
  }
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
  margin-top: 10px;
`;

const Welcome = ({ setShowModal, createFile, showEditor, setCurrentStep }) => {
  const history = useHistory();

  const handleNew = (type) => {
    createFile(type);
    setShowModal(ModalTypes.RenameModal);
  };

  const handleSandbox = () => {
    setCurrentStep(0);
    history.push("/onboarding");
  };

  return (
    <div
      className={`d-flex justify-content-center min-vh-100 ${
        showEditor ? `visually-hidden` : ``
      }`}
    >
      <div
        className="container-fluid mt-5"
        style={{
          width: "500px",
        }}
      >
        <Title>Follow our getting started guided tutorial</Title>
        <div className="d-flex">
          <Tag>
            <img src={Point1} /> Beginner Friendly
          </Tag>
          <Tag>
            <img src={Point2} /> 5 min
          </Tag>
        </div>
        <Desc>
          We’ll guide you through a basic development workflow to fork, modify,
          and compose with open web components.
        </Desc>
        <ButtonGetStarted onClick={handleSandbox}>
          Get Started <img src={Arrow} />
        </ButtonGetStarted>

        <Title className="second">Welcome to the Component Sandbox!</Title>
        <p className="text-secondary">
          Use this sandbox to create, inspect, modify, and compose components to
          create new experiences on NEAR.
        </p>
        <ButtonGetStarted
          className="outlined"
          onClick={() => setShowModal(ModalTypes.OpenModal)}
        >
          Open Component
        </ButtonGetStarted>
        <ButtonGetStarted onClick={() => handleNew(Filetype.Widget)}>
          Create New Component
        </ButtonGetStarted>
      </div>
    </div>
  );
};

export default Welcome;
