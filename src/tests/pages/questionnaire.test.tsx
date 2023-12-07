// @ts-nocheck
import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { QuestionComponent1 } from "../../screens/Onboarding/Questionnaire/question1";
import { QuestionComponent2 } from "../../screens/Onboarding/Questionnaire/question2";
import { QuestionComponent3 } from "../../screens/Onboarding/Questionnaire/question3";
import { QuestionComponent4 } from "../../screens/Onboarding/Questionnaire/question4";
import { WelcomeKyc } from "../../screens/Onboarding/Questionnaire/welcomeKyc";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("verify questionnaire screen with above test cases", () => {
  it("the following component of the screen renders without crashing", () => {
    render(
      <Router>
        <QuestionComponent1 />
      </Router>
    );
  });

  it("the following component of the screen renders without crashing 2", () => {
    render(
      <Router>
        <QuestionComponent2 />
      </Router>
    );
  });

  it("the following component of the screen renders without crashing 3", () => {
    render(
      <Router>
        <QuestionComponent3 />
      </Router>
    );
  });

  it("the following component of the screen renders without crashing 4", () => {
    render(
      <Router>
        <QuestionComponent4 />
      </Router>
    );
  });

  it("the following component of the screen renders without crashing for welcome kyc", () => {
    render(
      <Router>
        <WelcomeKyc />
      </Router>
    );
  });
});
