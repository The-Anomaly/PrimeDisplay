import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import mark from "../../../assets/mark-icn.png";
import mark_blue from "../../../assets/blue-mark.png";
import mark_green from "../../../assets/green-mark.png";
import "./payment.css";
import Navbar from "../HomeComponents/newnavbar";
import Footer from "../HomeComponents/newfooter";
import { API } from "../../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentSummary from "./ClarityExperience"

const Paymentpage = (props: any) => {
  return (
    <div>
      <Navbar payments={true} />
      <PaymentSummary mode="dark" />
      <Footer />
    </div>
  );
};
export default Paymentpage;
