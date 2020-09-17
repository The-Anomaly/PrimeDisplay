import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home/Home";
import { About } from "./Components/Home/About/About";
import Faq from "./Components/Home/FAQs/faq";
import OnboardingChat from "./Components/Home/OnboardingChat/onboardingchat";
import { ClarityForTeams } from "./Components/Home/ClarityForTeams/clarityforteams";
import { RecruitmentAnalysisForm } from "./Components/Home/Forms/RecruitmentAnalysisForm";
import AssessmentFirstPhase from "./Components/Home/Assesment/AssessmentPhaseone";
import AssessmentFirstPhaseComplete from "./Components/Home/Assesment/AssessmentPhaseonecomplete";
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
import AssessmentFourthPhaseComplete from "./Components/Home/Assesment/AssessmentPhaseFOURCOMPLETE";
import AssessmentFifthPhaseComplete from "./Components/Home/Assesment/Assessmentphasefivecomplete";
import AssessmentSixthPhaseComplete from "./Components/Home/Assesment/Assessmentsixthphasecomplete";
import AssessmentSeventhPhaseComplete from "./Components/Home/Assesment/Assessmentphasesevencompleted";
import SignUpKigenni from "./Components/Home/SignUp Kigenni/SignUpKigenni";
import KigenniDashboard from "./Components/KigenniDashboard/KigenniDashoard";
import KigenniFullResultPage from "./Components/KigenniDashboard/KigenniFullResultPage";
import ForgotPassword from "./Components/Home/ForgotPassword/SignIn";
import ResetPassword from "./Components/Home/ResetPassword/Resetpassword";
import PaymentSummary from "./Components/KigenniDashboard/paymentsummary";
import OnboardingChatPhase2 from "./Components/Home/OnboardingChat/onboardingchatphase2";
import CouncellorDates from "./Components/KigenniDashboard/CouncellorDates";
import CouncellorPaymentSummary from "./Components/KigenniDashboard/counsellorpaymentsummary";
import EmailVerification from "./Components/Home/SignUpEmailVerification/SignUpEmailVerification";
import NewDashboardFullInsight from "./Components/KigenniDashboard/NewDashboardFullinsight";
import CouncellorBookings from "./Components/KigenniDashboard/CouncellorBookings";
import CounsellorsRecommendation from "./Components/KigenniDashboard/NewCouncellorsRecommendation";
import NewDashboardSubsriptionPlan from "./Components/KigenniDashboard/NewDashboardSubsciptionPlan";
import NewDashboardSettings from "./Components/KigenniDashboard/DashboardSettings";
import NewDashboardChat from "./Components/KigenniDashboard/NewDashboardChat";
import NewDashboardSupport from "./Components/KigenniDashboard/NewDashboardSupport";
import CouncellorAllMessages from "./Components/KigenniDashboard/CouncellorDasboard/CouncellorAllMessages";
import CounsellorRecommendation from "./Components/KigenniDashboard/CouncellorDasboard/CouncellorRecommendation";
import CounsellorOverview from "./Components/KigenniDashboard/CouncellorDasboard/CouncellorOverview";
import CounsellorBookedSessions from "./Components/KigenniDashboard/CouncellorDasboard/CouncellorBookedSessions";
import ThirdPartyEmployersResult from "./Components/KigenniDashboard/ThirdPartyEmployersResult";
import ThirdPartyEmployerViewOne from "./Components/KigenniDashboard/ThirdPartyEmployerViewOne";
import OverPaid from "./Components/KigenniDashboard/Overpaid";
import Pending from "./Components/KigenniDashboard/Pending";
import NewDashboard from "./Components/KigenniDashboard/NewDashboard";
import ProfileBuilder from "./Components/KigenniDashboard/ProfileBuilder";
import NewDashboardJobOpportunities from "./Components/KigenniDashboard/NewDashboardJobOpportunities";
import whatsapp from "./assets/whatsapp.png";
import NewDashboardAllSubsriptionPlans from "./Components/KigenniDashboard/NewDashboardAllSubscription";
import NewDashboardCounsellorSubscription from "./Components/KigenniDashboard/NewDashboardCounsellorSubscription";
import TodoOverview from "./Components/KigenniDashboard/TodoOverview";
import TestPdf from "./Components/KigenniDashboard/TestPdf";
import CVProfileBuilder from "./Components/KigenniDashboard/CVProfileBuilder";
import TodoList from "./Components/KigenniDashboard/TodoList";
import ViewMoreModal from "./Components/KigenniDashboard/ViewMoreModal";
import CompleteTaskModal from "./Components/KigenniDashboard/CompleteTaskModal";
import CreateTaskModal from "./Components/KigenniDashboard/CreateTaskModal";

const App: React.FC = () => {
  return (
    <div className="App">
      <a href="whatsapp://send?phone=+2348176100160 &text=Hello">
        <img src={whatsapp} className="whatsapp" alt="whatsapp" />
      </a>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/clientchat" component={OnboardingChat} />
            <Route exact path="/clientchat2" component={OnboardingChatPhase2} />
            <Route exact path="/clarityforteams" component={ClarityForTeams} />
            <Route exact path="/overview" component={NewDashboard} />
            <Route exact path="/profilebuilder" component={CVProfileBuilder} />
            <Route
              exact
              path="/jobopportunities"
              component={NewDashboardJobOpportunities}
            />
            <Route
              exact
              path="/recruitmentform"
              component={RecruitmentAnalysisForm}
            />
            <Route
              exact
              path="/dashboard/personality"
              component={PersonalityType}
            />
            <Route
              exact
              path="/dashboard/careerfitness"
              component={CareerFitness}
            />
            <Route
              exact
              path="/assessmentphaseone"
              component={AssessmentFirstPhase}
            />
            <Route
              exact
              path="/assessmentphasefive"
              component={AssessmentFifthPhase}
            />
            <Route
              exact
              path="/assessmentphasefivecomplete"
              component={AssessmentFifthPhaseComplete}
            />
            <Route
              exact
              path="/assessmentphasesix"
              component={AssessmentSixthPhase}
            />
            <Route
              exact
              path="/assessmentphasesixcomplete"
              component={AssessmentSixthPhaseComplete}
            />
            <Route
              exact
              path="/assessmentphaseseven"
              component={AssessmentSeventhPhase}
            />
            <Route
              exact
              path="/assessmentphasesevencomplete"
              component={AssessmentSeventhPhaseComplete}
            />
            <Route
              exact
              path="/assessmentphasethree"
              component={AssessmentThirdPhase}
            />
            <Route
              exact
              path="/assessmentphasecomplete"
              component={AssessmentFirstPhaseComplete}
            />
            <Route
              exact
              path="/secondphasecomplete"
              component={AssessmentSecondPhaseComplete}
            />
            <Route
              exact
              path="/thirdphasecomplete"
              component={AssessmentThirdPhaseComplete}
            />
            <Route
              exact
              path="/assessmentphasefour"
              component={Assessmentfourthphase}
            />
            <Route
              exact
              path="/assessmentphasefour1"
              component={Assessmentfourthphase_1}
            />
            <Route
              exact
              path="/assessmentphasefourcomplete"
              component={AssessmentFourthPhaseComplete}
            />
            <Route
              exact
              path="/assessmentphasetwo"
              component={AssessmentSecondPhase}
            />
            <Route exact path="/paymentplan" component={SelectPaymentPlan} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route
              exact
              path="/resetpassword/:userid/:token"
              component={ResetPassword}
            />
            {/* Kegenni starts here */}
            <Route
              exact
              path="/councellorfee"
              component={NewDashboardCounsellorSubscription}
            />
            <Route exact path="/councellordates" component={CouncellorDates} />
            <Route exact path="/signup/kigenni" component={SignUpKigenni} />
            <Route
              exact
              path="/paymentsummary"
              component={NewDashboardAllSubsriptionPlans}
            />
            <Route
              exact
              path="/free/dashboard"
              component={() => <Redirect to="/overview" />}
            />
            <Route
              exact
              path="/dashboard/fullresult"
              component={() => <Redirect to="/fullresult" />}
            />
            <Route exact path="/paymentplan" component={SelectPaymentPlan} />
            <Route
              exact
              path="/signup"
              component={() => <Redirect to="/signup/thirdpary" />}
            />
            {/* Kegenni starts here */}
            <Route exact path="/signup/thirdpary" component={SignUpKigenni} />
            <Route
              exact
              path="/thirdpary/dashboard"
              component={() => <Redirect to="/overview" />}
            />
            <Route
              exact
              path="/counsellorsrecommendation"
              component={CounsellorsRecommendation}
            />
            <Route
              exact
              path="/dashboardsubsriptionplan"
              component={NewDashboardSubsriptionPlan}
            />
            <Route
              exact
              path="/dashboardsettings"
              component={NewDashboardSettings}
            />
            <Route exact path="/councellorchat" component={NewDashboardChat} />
            <Route
              exact
              path="/dashboardsupport"
              component={NewDashboardSupport}
            />
            <Route
              exact
              path="/counsellormessages"
              component={CouncellorAllMessages}
            />
            <Route
              exact
              path="/counsellorrecommendations"
              component={CounsellorRecommendation}
            />
            <Route exact path="/todooverview" component={TodoOverview} />
            <Route exact path="/generatecv" component={TestPdf} />

            <Route
              exact
              path="/counselloroverview"
              component={CounsellorOverview}
            />
            <Route
              exact
              path="/counsellorbookings"
              component={CounsellorBookedSessions}
            />
            <Route
              exact
              path="/thirdpary/fullresult"
              component={() => <Redirect to="/fullinsight" />}
            />
            <Route
              exact
              path="/employers/result"
              component={ThirdPartyEmployersResult}
            />
            <Route
              exact
              path="/employers/result/:email"
              component={ThirdPartyEmployerViewOne}
            />
            <Route exact path="/thirdparty/overpaid" component={OverPaid} />
            <Route exact path="/thirdparty/pending" component={Pending} />
            <Route
              exact
              path="/verifyemail/:userid/:token"
              component={EmailVerification}
            />
            <Route
              exact
              path="/fullinsight"
              component={NewDashboardFullInsight}
            />
            <Route
              exact
              path="/cvdashboard"
              component={ProfileBuilder}
            />
            <Route
              exact
              path="/todolist"
              component={TodoList}
            />
            <Route
              exact
              path="/viewmore"
              component={ViewMoreModal}
            />
            <Route
              exact
              path="/completetask"
              component={CompleteTaskModal}
            />
            <Route
              exact
              path="/createtask"
              component={CreateTaskModal}
            />
            <Route exact path="/meetings" component={CouncellorBookings} />
            <Route exact path="/councellordates" component={CouncellorDates} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
