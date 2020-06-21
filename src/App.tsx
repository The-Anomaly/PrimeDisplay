import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home/Home";
import { About } from "./Components/Home/About/About";
import Faq from "./Components/Home/FAQs/faq";
import OnboardingChat from "./Components/Home/OnboardingChat/onboardingchat";
import { ClarityForTeams } from "./Components/Home/ClarityForTeams/clarityforteams";
import { RecruitmentAnalysisForm } from "./Components/Home/Forms/RecruitmentAnalysisForm";
import AssessmentFirstPhase   from "./Components/Home/Assesment/AssessmentPhaseone";
import AssessmentFirstPhaseComplete   from "./Components/Home/Assesment/AssessmentPhaseonecomplete";
import AssessmentSecondPhase from "./Components/Home/Assesment/AssessmentPhaseTwo";
import AssessmentSecondPhaseComplete from "./Components/Home/Assesment/AssessmentPhaseTWOcomplete";
import AssessmentThirdPhase from "./Components/Home/Assesment/AssessmentPhaseThree";
import AssessmentThirdPhaseComplete from "./Components/Home/Assesment/AssessmentPhaseTHREEComplete";
import Assessmentfourthphase from "./Components/Home/Assesment/Assessmentstagefour/AssessmentPhaseFour";
import Assessmentfourthphase_1 from "./Components/Home/Assesment/Assessmentstagefour/AssessmentPhaseFour_1";
import { SelectPaymentPlan } from "./Components/Home/Assesment/SelectPaymentPlan";
import SignUp from "./Components/Home/SignUp/SignUp";
import SignIn from "./Components/Home/SignIn/SignIn";
import AssessmentFifthPhase from "./Components/Home/Assesment/AssessmentPhaseFive";
import AssessmentSixthPhase from "./Components/Home/Assesment/AssessmentPhaseSix";
import AssessmentSeventhPhase from "./Components/Home/Assesment/AssessmentPhaseSeven";
import CareerFitness from "./Components/Home/Dashboard/CareerFitness";
import PersonalityType from "./Components/Home/Dashboard/PersonalityType";
import AssessmentFourthPhaseComplete from './Components/Home/Assesment/AssessmentPhaseFOURCOMPLETE';
import AssessmentFifthPhaseComplete from './Components/Home/Assesment/Assessmentphasefivecomplete';
import AssessmentSixthPhaseComplete from './Components/Home/Assesment/Assessmentsixthphasecomplete';
import AssessmentSeventhPhaseComplete from './Components/Home/Assesment/Assessmentphasesevencompleted';
import SignUpKigenni from './Components/Home/SignUp Kigenni/SignUpKigenni';
import KigenniDashboard from './Components/KigenniDashboard/KigenniDashoard';
import KigenniFullResultPage from './Components/KigenniDashboard/KigenniFullResultPage';
import ForgotPassword from './Components/Home/ForgotPassword/SignIn';
import ResetPassword from './Components/Home/ResetPassword/Resetpassword';
import PaymentSummary from './Components/KigenniDashboard/paymentsummary';


const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/clientchat" component={OnboardingChat} />
              <Route exact path="/clarityforteams" component={ClarityForTeams} />
              <Route exact path="/recruitmentform" component={RecruitmentAnalysisForm} />
              <Route exact path="/dashboard/personality" component={PersonalityType} />
              <Route exact path="/dashboard/careerfitness" component={CareerFitness} />
              <Route exact path="/assessmentphaseone" component={AssessmentFirstPhase} />
              <Route exact path="/assessmentphasefive" component={AssessmentFifthPhase} />
              <Route exact path="/assessmentphasefivecomplete" component={AssessmentFifthPhaseComplete} />
              <Route exact path="/assessmentphasesix" component={AssessmentSixthPhase} />
              <Route exact path="/assessmentphasesixcomplete" component={AssessmentSixthPhaseComplete} />
              <Route exact path="/assessmentphaseseven" component={AssessmentSeventhPhase} />
              <Route exact path="/assessmentphasesevencomplete" component={AssessmentSeventhPhaseComplete} />
              <Route exact path="/assessmentphasethree" component={AssessmentThirdPhase} />
              <Route exact path="/assessmentphasecomplete" component={AssessmentFirstPhaseComplete} />
              <Route exact path="/secondphasecomplete" component={AssessmentSecondPhaseComplete}/>
              <Route exact path="/thirdphasecomplete" component={AssessmentThirdPhaseComplete}/>
              <Route exact path="/assessmentphasefour" component={Assessmentfourthphase}/>
              <Route exact path="/assessmentphasefour1" component={Assessmentfourthphase_1}/>
              <Route exact path="/assessmentphasefourcomplete" component={AssessmentFourthPhaseComplete}/>
              <Route exact path="/assessmentphasetwo" component={AssessmentSecondPhase} />
              <Route exact path="/paymentplan" component={SelectPaymentPlan} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/resetpassword/:userid/:token" component={ResetPassword} />
              {/* Kegenni starts here */}
              <Route exact path="/signup/kigenni" component={SignUpKigenni} />
              <Route exact path="/paymentsummary" component={PaymentSummary} />
              <Route exact path="/free/dashboard" component={KigenniDashboard} />
              <Route exact path="/dashboard/fullresult" component={KigenniFullResultPage} />
            </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
