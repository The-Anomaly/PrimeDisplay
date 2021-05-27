import * as React from "react";
import "./footer.css";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

const Footer = () => {
    let date = new Date().getFullYear()
    return (
        <>
            <footer className="p-footer">
                <div className="p-footer-list">
                <div className="p-footer-1">
                    <img className="p-footer-1-img" src={logo} alt="logo" />
                    <p className="p-footer-1-txt">Our goal is to create a more intriguing class/ boardrooms through the provision of high quality interactive projectors and flat panel display units.</p>
                </div>
                <div>
                    <div className="p-footer-hd">Links</div>
                    <Link className="p-footer-link" to="/"><div className="p-footer-item">Home</div></Link>
                    <Link className="p-footer-link" to="/about"><div className="p-footer-item">About Us</div></Link>
                    <Link className="p-footer-link" to="/contact"><div className="p-footer-item">Contact Us</div></Link>
                </div>
                <div>
                    <div className="p-footer-hd">Products</div>
                    <Link className="p-footer-link" to="/services"><div className="p-footer-item">Services</div></Link>
                    <Link className="p-footer-link" to="/buy"><div className="p-footer-item">Buy</div></Link>
                </div>
                <div className="p-footer-4">
                    <div className="p-footer-hd">Contacts</div>
                    <p className="p-footer-item">Feel free to get in touch with us via phone or send us a message.</p>
                    <p className="p-footer-ctct">+234 (0) 815 839 3221</p>
                    <p className="p-footer-ctct">info@primedisplay.com</p>
                </div>
                </div>
                <hr />
                <div className="p-ftr-cpysec">
                    <p className="p-footer-copy">&copy; Prime Display {date}, All Rights Reserved</p>
                    <div className="p-footer-socials">
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-google"></i>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;