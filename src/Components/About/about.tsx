import * as React from "react";
import { Container } from "react-bootstrap";
import "./about.css";
import NavBar from "../General/navbar";

const About = () => {
    return (
        <>
        <NavBar about={true} />
            <div>
                about
            </div>
        </>
    )
}

export default About;