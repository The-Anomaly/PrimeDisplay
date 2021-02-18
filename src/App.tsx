import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
// import Home from "./Components/Home/Home/Home";
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
import KigenniDashboard from "./Components/Dashboard/KigenniDashoard";
import KigenniFullResultPage from "./Components/Dashboard/KigenniFullResultPage";
import ForgotPassword from "./Components/Home/ForgotPassword/SignIn";
import ResetPassword from "./Components/Home/ResetPassword/Resetpassword";
import PaymentSummary from "./Components/Dashboard/paymentsummary";
import OnboardingChatPhase2 from "./Components/Home/OnboardingChat/onboardingchatphase2";
import CouncellorDates from "./Components/Dashboard/CouncellorDates";
import CouncellorPaymentSummary from "./Components/Dashboard/counsellorpaymentsummary";
import EmailVerification from "./Components/Home/SignUpEmailVerification/SignUpEmailVerification";
import NewDashboardFullInsight from "./Components/Dashboard/NewDashboardFullinsight";
import CouncellorBookings from "./Components/Dashboard/CouncellorBookings";
import CounsellorsRecommendation from "./Components/Dashboard/NewCouncellorsRecommendation";
import NewDashboardSubsriptionPlan from "./Components/Dashboard/NewDashboardSubsciptionPlan";
import NewDashboardSettings from "./Components/Dashboard/DashboardSettings";
import NewDashboardChat from "./Components/Dashboard/NewDashboardChat";
import NewDashboardSupport from "./Components/Dashboard/NewDashboardSupport";
import CounsellorAllMessages from "./Components/Dashboard/CouncellorDasboard/CouncellorAllMessages";
import CounsellorOverview from "./Components/Dashboard/CouncellorDasboard/CouncellorOverview";
import CounsellorBookedSessions from "./Components/Dashboard/CouncellorDasboard/CouncellorBookedSessions";
import ThirdPartyEmployersResult from "./Components/Dashboard/ThirdPartyEmployersResult";
import ThirdPartyEmployerViewOne from "./Components/Dashboard/ThirdPartyEmployerViewOne";
import OverPaid from "./Components/Dashboard/Overpaid";
import Pending from "./Components/Dashboard/Pending";
import NewDashboard from "./Components/Dashboard/NewDashboard";
import ProfileBuilder from "./Components/Dashboard/ProfileBuilder";
import NewDashboardJobOpportunities from "./Components/Dashboard/NewDashboardJobOpportunities";
import whatsapp from "./assets/whatsapp.png";
import NewDashboardAllSubsriptionPlans from "./Components/Dashboard/NewDashboardAllSubscription";
import NewDashboardCounsellorSubscription from "./Components/Dashboard/NewDashboardCounsellorSubscription";
import TodoOverview from "./Components/Dashboard/TodoOverview";
import TestPdf from "./Components/Dashboard/TestPdf";
import CVProfileBuilder from "./Components/Dashboard/CVProfileBuilder";
import TodoList from "./Components/Dashboard/TodoList";
import ViewMoreModal from "./Components/Dashboard/ViewMoreModal";
import CompleteTaskModal from "./Components/Dashboard/CompleteTaskModal";
import CreateTaskModal from "./Components/Dashboard/CreateTaskModal";
import CounsellorScheduledMeetings from "./Components/Dashboard/CouncellorDasboard/CouncellorScheduledMeetings";
import CounsellorRecommendations1 from "./Components/Dashboard/CouncellorDasboard/CouncellorRecommendations1";
import CounsellorRecommendation2 from "./Components/Dashboard/CouncellorDasboard/CouncellorRecommendation2";
import CounsellorAssignedMembers from "./Components/Dashboard/CouncellorDasboard/CouncellorAssignedMembers";
import Referrals from "./Components/Dashboard/CouncellorDasboard/referrals";
import CounsellorSupport from "./Components/Dashboard/CouncellorDasboard/CouncellorSupport";
import CounsellorSettings from "./Components/Dashboard/CouncellorDasboard/CouncellorSettings";
import CounsellorMessageOneUser from "./Components/Dashboard/CouncellorDasboard/CouncellorMessagesOneUser";
import CouncellorRecommendationsToAll from "./Components/Dashboard/CouncellorDasboard/CouncellorRecommendationsToAll";
import CounsellorsSignIn from "./Components/Home/SignIn/CounsellorsSignIn";
import CounsellorSignUp from "./Components/Home/SignUp/CounsellorSignUp";
import CounsellorViewUserResult from "./Components/Dashboard/CouncellorDasboard/CounsellorViewUserResult";
import WebSocketInstance from "./websocket";
import RedesignedHome from "./Components/Home/Home/RedesignedHome";
import Contactpage from "./Components/Home/Redesigned_Contact_page/contact_page";
import Paymentpage from "./Components/Home/Redesigned_Payment_Page/payment_page";
import Privacy from "./Components/Home/Legal_policy_page/privacy_policy";
import Terms from "./Components/Home/Legal_policy_page/terms&conditions";
import Signup from "./Components/Home/Redesigned_signup_page/signup";
import Signin from "./Components/Home/Redesigned_signup_page/signin";
import Email_confirm_page from "./Components/Home/Redesigned_confirmation_page/email_confirmation";
import Acc_confirm_page from "./Components/Home/Redesigned_confirmation_page/account_confimatn";
import counsellorSignup from "./Components/Home/redesign_counsellor_page/Counsellorsignup";
import counsellorSignin from "./Components/Home/redesign_counsellor_page/Counsellorsignin";
import ForgotPasswordCounselor from "./Components/Home/redesign_counsellor_page/forgotpassword_counselor";
import * as msgActions from "./Store/Actions/index";
import { connect } from "react-redux";
import FullResultForCounsellors from "./Components/Dashboard/FullResultForCounsellors";
import NewDashboardAllMessages from "./Components/Dashboard/NewDashboardAllMessages";
import Afflanding from "./Components/Home/Clarity Affiliate landing page/affiliate_landing";
import { NewAbout } from "./Components/Home/About/NewAbout";
import CounsellorCVProfileBuilder from "./Components/Dashboard/CouncellorDasboard/CounsellorCVProfileBuilder";
import CousellorProfileBuilderEdit from "./Components/Dashboard/CouncellorDasboard/CounsellorProfileBuilder";
import CounsellorAssignedMembersViewOne from "./Components/Dashboard/CouncellorDasboard/CounsellorAssignedMembersViewOne";
import ForgotPasswordNew from "./Components/Home/Redesigned_signup_page/forgotpassword";
import CounsellorViewUsersCVProfile from "./Components/Dashboard/CouncellorDasboard/CounsellorViewUsersCVProfileBuilder";
import CounsellorLandingPage from "./Components/Dashboard/CounsellorLandingPage/counsellorlandingpage";
import ThirdPartyOverview from "./Components/Dashboard/AffiliateDashboard/ThirdPartyOverview";
import SigninAffiliates from "./Components/Home/Redesigned_signup_page/signinAffiliates";
import AffiliatesSignup from "./Components/Home/Redesigned_signup_page/signupAffiliates";
import BehaviouralAnalytics from "./Components/Dashboard/AffiliateDashboard/BehaviouralAnalytics";
import WanaChatBot from "./Components/Home/WanaChat/WanaChatBot";

import ReactGA from "react-ga";
import COUNSELLORRESULT from "./Components/Dashboard/CouncellorDasboard/CounsellorResult";
import IceBreaker from "./Components/Home/Assesment/AssessmentIceBreaker";

ReactGA.initialize("UA-151203321-1");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const self: any = this;
    WebSocketInstance?.addCallbacks(
      self.props.setMessages.bind(this),
      self.props.addMessage.bind(this)
    );
  }
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }
  render() {
    return (
      <div className="App">
        <a href="whatsapp://send?phone=+2348176100160 &text=Hello">
          <img src={whatsapp} className="whatsapp" alt="whatsapp" />
        </a>
        <div>
          <BrowserRouter>
            <Switch>
              {/* <Route exact path="/oldhome" component={Home} /> */}
              <Route exact path="/contact" component={Contactpage} />
              <Route exact path="/pricing" component={Paymentpage} />
              <Route exact path="/privacy_policy" component={Privacy} />
              <Route exact path="/terms&conditions" component={Terms} />
              <Route exact path="/terms&conditions" component={Terms} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/" component={RedesignedHome} />
              <Route exact path="/affiliatehomepage" component={Afflanding} />
              <Route
                exact
                path="/counsellor/signup"
                component={counsellorSignup}
              />
              <Route
                exact
                path="/counsellor/signin"
                component={counsellorSignin}
              />
              <Route
                exact
                path="/counsellor/signin/forgotpassword"
                component={ForgotPasswordCounselor}
              />
              {/* <Route exact path="/" component={Home} /> */}
              <Route
                exact
                path="/confirm_email"
                component={Email_confirm_page}
              />
              <Route
                exact
                path="/account_confirmation"
                component={Acc_confirm_page}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/aboutus" component={NewAbout} />
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/clientchat" component={OnboardingChat} />
              <Route
                exact
                path="/clientchat2"
                component={OnboardingChatPhase2}
              />
              <Route
                exact
                path="/clarityforteams"
                component={ClarityForTeams}
              />
              <Route exact path="/overview" component={NewDashboard} />
              <Route
                exact
                path="/profilebuilder"
                component={CVProfileBuilder}
              />
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
                path="/password_recovery"
                component={ForgotPasswordNew}
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
              <Route exact path="/signin" component={Signin} />
              <Route
                exact
                path="/old/counsellor/signin"
                component={CounsellorsSignIn}
              />
              <Route exact path="/old/signup" component={SignUp} />
              <Route exact path="/old/signin" component={SignIn} />
              <Route
                exact
                path="/users_profile/:email"
                component={CounsellorViewUsersCVProfile}
              />
              <Route
                exact
                path="/old/counsellor/signup"
                component={CounsellorSignUp}
              />
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
                component={() => <Redirect to="/counsellorfee" />}
              />
              <Route
                exact
                path="/counsellorfee"
                component={NewDashboardCounsellorSubscription}
              />
              <Route
                exact
                path="/counsellordates"
                component={CouncellorDates}
              />
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
                path="/dashboardsubscriptionplan"
                component={NewDashboardSubsriptionPlan}
              />
              <Route
                exact
                path="/dashboardsettings"
                component={NewDashboardSettings}
              />
              <Route
                exact
                path="/counsellorchat"
                component={NewDashboardChat}
              />
              <Route
                exact
                path="/allusermessages"
                component={NewDashboardAllMessages}
              />
              <Route
                exact
                path="/counsellorprofilebuilder"
                component={CounsellorCVProfileBuilder}
              />
              <Route
                exact
                path="/counsellorprofilebuilderedit"
                component={CousellorProfileBuilderEdit}
              />
              <Route
                exact
                path="/dashboardsupport"
                component={NewDashboardSupport}
              />
              <Route
                exact
                path="/counsellormessages"
                component={CounsellorAllMessages}
              />
              <Route
                exact
                path="/counsellorrecommendations2"
                component={CounsellorRecommendation2}
              />
              <Route
                exact
                path="/counsellorrecommendations1"
                component={CouncellorRecommendationsToAll}
              />
              <Route
                exact
                path="/counsellorassignedmembers"
                component={CounsellorAssignedMembers}
              />
              <Route
                exact
                path="/counsellorassignedmembers/:id"
                component={CounsellorAssignedMembersViewOne}
              />
              <Route exact path="/referrals" component={Referrals} />
              <Route
                exact
                path="/counsellor/userinsight"
                component={CounsellorViewUserResult}
              />
              <Route
                exact
                path="/counsellorresultpage"
                component={COUNSELLORRESULT}
              />
              <Route
                exact
                path="/counsellorsupport"
                component={CounsellorSupport}
              />
              <Route
                exact
                path="/counsellorrecommendations3"
                component={CounsellorRecommendations1}
              />
              <Route
                exact
                path="/counsellorsettings"
                component={CounsellorSettings}
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
                path="/counsellormessagehistory/:email/:chatID"
                component={CounsellorMessageOneUser}
              />
              <Route
                exact
                path="/usermessagehistory/:email/:chatID"
                component={NewDashboardChat}
              />
              <Route
                exact
                path="/counsellor/result/:email"
                component={FullResultForCounsellors}
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
              <Route exact path="/cvdashboard" component={ProfileBuilder} />
              <Route exact path="/todolist" component={TodoList} />
              <Route exact path="/viewmore" component={ViewMoreModal} />
              <Route exact path="/completetask" component={CompleteTaskModal} />
              <Route exact path="/createtask" component={CreateTaskModal} />
              <Route exact path="/meetings" component={CouncellorBookings} />
              <Route
                exact
                path="/counsellormeetings"
                component={CounsellorScheduledMeetings}
              />
              <Route
                exact
                path="/affiliates/signin"
                component={SigninAffiliates}
              />
              <Route
                exact
                path="/affiliates/signup"
                component={AffiliatesSignup}
              />
              <Route
                exact
                path="/forcounsellors"
                component={CounsellorLandingPage}
              />
              {/* Affiliates Starts here */}
              <Route exact path="/affiliates" component={ThirdPartyOverview} />
              <Route exact path="/affiliates/analytics" component={BehaviouralAnalytics} />
              <Route exact path="/wana" component={WanaChatBot} />
              <Route exact path="/icebreaker" component={IceBreaker} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => dispatch(msgActions.addMessage(message)),
    setMessages: (messages) => dispatch(msgActions.setMessages(messages)),
  };
};
export default connect(null, mapDispatchToProps)(App);
