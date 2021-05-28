import * as React from "react";
import "./buy.css";
import NavBar from "../General/navbar";
import Footer from "../General/footer";
import "../Landing/landing.css";
import product from "../../assets/product.png";
import product2 from "../../assets/product2.png";
import prod1 from "../../assets/prod1.jpg";
import prod2 from "../../assets/prod2.jpg";
import prod3 from "../../assets/prod3.jpg";
import prod4 from "../../assets/prod4.jpg";
import prod5 from "../../assets/prod5.jpg";
import prod6 from "../../assets/prod6.jpg";
import prod7 from "../../assets/prod7.jpg";
import prod8 from "../../assets/prod8.jpg";
import prod9 from "../../assets/prod9.jpg";
import prod10 from "../../assets/prod10.jpg";
import prod11 from "../../assets/prod11.jpg";
import prod12 from "../../assets/prod12.jpg";
import { Link, useHistory } from "react-router-dom";

//Smart Screens
// 3751RK Optoma Flat panel prod1
// 3861RK OPTOMA prod2
// 3861RK prod3
// 5751RK OPTOMA prod4
// 5751RK prod5
// OPTOMA FLAT PANEL prod6

// Projectors
// S334e prod7
// UHD35 prod8
// w400 prod9
// x309st prod10
// ZH403 prod11
// ZH406ST prod12
const screens = [
    {
        id: 0,
        name: "3751RK Optoma Flat panel",
        short_descrip: "Robust collaboration, extensive connectivity options and a value-focused design",
        descrip: "Robust collaboration, extensive connectivity options and a value-focused design. With a combined technology and packed with everything a classroom or business requires, the Creative Touch 3 Series delivers all the functionalities and processing power needed to create, educate and collaborate. Easily access the front-facing ports for HDMI and USB connectivity. For wireless connectivity, Optoma’s TapCast Pro allows up to four users to share content at the same time from their Windows, iOS, MacOS, Chrome or Android device. The easy-to-use IFPDs also make lessons more fun with built-in collaboration tools such as Vote, where teachers are able to collect valuable feedback instantly. Equipped with an OPS slot, and easy to download OTA updates. The touchscreen display is future-proofed should your requirements change in the ever-changing world of technology (OPS sold separately).",
        image: prod1,
    },
    {
        id: 1,
        name: "3861RK OPTOMA",
        short_descrip: "It exhibits robust collaboration, extensive connectivity options and a value-focused design.",
        descrip: "It exhibits robust collaboration, extensive connectivity options and a value-focused design. Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space. Premium wireless collaboration software tools are preinstalled to enable seamless interactivity from a variety of different devices. The included quick-draw pen instantly activates the whiteboard application, saving the time and energy spent on having to manually change modes. With a slim, narrow-bezel, high-end design the 5 Series will fit seamlessly into any environment. The screen features a 1mm air gap for natural touch functionality so you can write clearly and confidently with improved accuracy. Meeting room scheduling is simplified with the included Joan meeting widget and app, a collaborative calendar tool that seamlessly pairs with popular calendars to take the guesswork out of meeting room availability directly. Book meetings on the spot or through your existing desktop calendar and mobile phone.",
        image: prod2,
    },
    {
        id: 2,
        name: "3861RK",
        short_descrip: "short description, short description",
        descrip: " Odio etiam nunc, lacus et bibendum idshort description, short description",
        image: prod3,
    },
    {
        id: 3,
        name: "5751RK OPTOMA",
        short_descrip: "Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space",
        descrip: "Optoma Creative Touch 5 Series premium interactive flat panel displays provide excellent collaboration and connectivity features for any classroom or business space. Premium wireless collaboration software tools are preinstalled to enable seamless interactivity from a variety of different devices. The included quick-draw pen instantly activates the whiteboard application, saving the time and energy spent on having to manually change modes. With a slim, narrow-bezel, high-end design the 5 Series will fit seamlessly into any environment. The screen features a 1mm air gap for natural touch functionality so you can write clearly and confidently with improved accuracy. Meeting room scheduling is simplified with the included Joan meeting widget and app, a collaborative calendar tool that seamlessly pairs with popular calendars to take the guesswork out of meeting room availability directly. Book meetings on the spot or through your existing desktop calendar and mobile phone.",
        image: prod4,
    },
    {
        id: 4,
        name: "5751RK",
        short_descrip: "short description, short description",
        descrip: "short description Odio etiam nunc, lacus et bibendum id, short description",
        image: prod5,
    },
    {
        id: 5,
        name: "OPTOMA FLAT PANEL",
        short_descrip: "short description, short description",
        descrip: "short description Odio etiam nunc, lacus et bibendum id, short description",
        image: prod6,
    }
]

const projectors = [
    {
        id: 0,
        name: "S334e",
        short_descrip: "The S334e boasts amazing colour, long lamp life and energy-saving features to provide you with a low overall cost of ownership.",
        descrip: "Bright projection - Project bright vibrant presentations effortlessly any time of day. Designed for meeting rooms and classrooms. The S334e boasts amazing colour, long lamp life and energy-saving features to provide you with a low overall cost of ownership. This projector is easy to connect to with multiple inputs, a built-in speaker and USB Power. Perfect for connecting HDMI dongles such as the Optoma HDCast Pro and the Google Chromecast or a laptop, PC or Blu-ray player for clear projected images with sound. It’s a Portable and lightweight projector can be installed or taken on the move for off-site meetings with the optional carry bag.",
        image: prod7,
    },
    {
        id: 1,
        name: "UHD35",
        short_descrip: "Immerse yourself in a world of Ultra HD teaching and presentations with an excellent colour depth, crystal clear detail, and sparkling contrast projector.",
        descrip: "Immerse yourself in a world of Ultra HD teaching and presentations with an excellent colour depth, crystal clear detail, and sparkling contrast projector. The lightning-fast, low latency 4K UHD UHD35 delivers impressive cinema-quality images, an ultra-low input lag of 4.2ms and a high refresh rate of 240Hz perfect for a competitive classroom/boardroom and Big screen entertainment. Packed with the latest technology and features, this stylish projector boasts High Dynamic Range (HDR) and HLG compatibility, Full 3D and two HDMI 2.0 ports.",
        image: prod8,
    },
    {
        id: 2,
        name: "w400",
        short_descrip: "Transform the delivery of your presentation with the first ever 4,000 lumen, small, lightweight W400 projector.",
        descrip: "Transform the delivery of your presentation with the first ever 4,000 lumen, small, lightweight W400 projector. This model is designed to be used at any time of day and for multiple purposes, including professional use (from business meetings to classrooms). It offers top quality projected colour, long lamp life with a low overall cost of ownership. This HD ready product boasts simplicity in design, with easy navigation and reliability. Convenient, with multiple inputs including HDMI and MHL. This projector is ideal for connecting HDMI dongles such as the Google Chromecast and the Optoma HDCast Pro enabling you to connect your laptop, PC or Blu-ray player. This compact can either be installed or conveniently taken on the move due to its Lightweight and portability.",
        image: prod9,
    },
    {
        id: 3,
        name: "x309st",
        short_descrip: "Designed for small meeting rooms and classrooms, this short throw projector boasts amazing colour, a long lamp life and energy saving features for a lower overall cost of ownership.",
        descrip: "Short throw, bright and compact projector - Designed for small meeting rooms and classrooms, this short throw projector boasts amazing colour, a long lamp life and energy saving features for a lower overall cost of ownership. Multiple inputs, USB power and a built-in speaker provide an easy set-up perfect for connecting to laptop, PC or Blu-ray player for clear projected images with sound. You can even connect a HDMI dongle for wireless presentations.",
        image: prod10,
    },
    {
        id: 4,
        name: "ZH403",
        short_descrip: "Designed for maintenance free continuous operation, the ZH403 can be installed in virtually any orientation.",
        descrip: "The ZH403 is a compact Full HD 1080p DuraCore laser projector. Designed for maintenance free continuous operation, it can be installed in virtually any orientation. Its small and lightweight footprint, 1.3x zoom combined with 360-degree and portrait projection make it a breeze to install. This feature packed projector is 4K and HDR compatible, has a built-in speaker and its laser technology delivers up to 30,000 hours maintenance-free laser light source. For ultimate control, the projector comes with RJ45 connection allowing you to monitor and control your network in multiple rooms. Geared for medium-sized exhibition venues, events and tradeshows or meeting rooms. It maintains excellent image quality as brightness and colour saturation is preserved for longer compared to lamp systems.",
        image: prod11,
    },
    {
        id: 5,
        name: "ZH406ST",
        short_descrip: "The ZH406ST is a compact short throw Full HD 1080p DuraCore laser projector. Designed for maintenance-free, continuous operation. It can be installed in virtually any orientation.",
        descrip: "The ZH406ST is a compact short throw Full HD 1080p DuraCore laser projector. Designed for maintenance-free, continuous operation. It can be installed in virtually any orientation. Pack full of features, this compact laser projector has built-in speakers, 4K and HDR compatible, and low maintenance with extremely long-life laser technology. For ultimate control, the projector comes with RJ45 connection allowing you to monitor and control your network in multiple rooms. It exhibits 30,000 hours maintenance-free laser light source. Perfect for business, education and museums where a clear bright image is required.",
        image: prod12,
    },
]

const Buy = () => {
  const [state, setState] = React.useState<any>({
    switchIt: false,
    number: 1,
    img: "",
    description: "",
    product_name: "",
  });
  const { switchIt, number, img, description, product_name } = state;
  const handleChange = (e: any) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
  }
  let history = useHistory();
  const viewMore = (x: any) => {
    //   window.scrollTo(-0, -0);
    //   setState({
    //       ...state,
    //       switchIt: true,
    //       img: x.image,
    //       description: x.descrip,
    //       product_name: x.name,
    //   })
    return history.push({
      pathname: `/buy/${x.name}`,
      state: {
        id: x.id,
        img: x.image,
        description: x.descrip,
      },
    });
  }

  return (
    <>
      <NavBar buy={true} />
      {!switchIt && (
        <main>
          <div className="p-buy-sec1 p-marg">
            <h5 className="p-buy-sec1-ttl">Our Products</h5>
            <div className="p-buy-sec1-inputsec">
              <input
                className="p-buy-search-input"
                type="search"
                name="search"
                placeholder="Search for products by Name or Type, eg: Projectors"
              />
              <button className="p-buy-search-btn">Search</button>
            </div>
          </div>
          <div className="p-buy-products p-marg">
            <h5 className="p-buy-sec1-ttl">Smart Screens</h5>
            <div className="p-buy-itemsec">
              {screens.map((x) => (<div className="p-buy-items">
                <img className="p-buy-products-img" src={x.image} alt="" />
                <h6 className="p-buy-products-hd">{x.name}</h6>
                <p className="p-buy-products-descrip">
                  {x.short_descrip}
                </p>
                <a className="p-buy-products-link" onClick={() => viewMore(x)}>View More</a>
              </div>))}
            </div>
          </div>

          {/* Projectors */}
          <div className="p-buy-products p-marg">
            <h5 className="p-buy-sec1-ttl">Projectors</h5>
            <div className="p-buy-itemsec">
              {projectors.map((x) => (<div className="p-buy-items">
                <img className="p-buy-products-img" src={x.image} alt="" />
                <h6 className="p-buy-products-hd">{x.name}</h6>
                <p className="p-buy-products-descrip">
                  {x.short_descrip}
                </p>
                <a className="p-buy-products-link" onClick={() => viewMore(x)}>View More</a>
              </div>))}
              {/* <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div> */}
            </div>
          </div>
        </main>
      )}
      {/* {switchIt && (
        <main>
            <div className="p-view-ctrl p-padd">
                <div className="p-view-ctrl-1">
                    <span className="p-view-details p-view-details-active">About Product</span>
                    <span className="p-view-details">Details</span>
                    <span className="p-view-details">Specs</span>
                </div>
                <div className="p-view-ctrl-2">
                    <span>On Sale from <b>$3,299.00</b></span>
                    <input className="p-buy-num" name="number" onChange={handleChange} value={number} type="number" />
                    <button className="p-buy-btn">Buy</button>
                </div>
            </div>
          <div className="p-viewmore">
            <div className="p-viewmore-1">
              <button className="p-viewmore-backbtn" onClick={goBack}>Go Back</button>
              <div className="p-viewmore-progress">
                <span>Home</span> › <span>Buy</span> ›{" "}
                <span>{product_name}</span>
              </div>
              <h2 className="p-vm-ttl">{product_name}</h2>
              <p className="p-vm-descrip">
                {description}
              </p>
              <div className="p-colorsec">
                <div className="p-prod-color-border p-prod-color-active"><div className="p-prod-color p-prod-color-black"></div></div>
                <div className="p-prod-color-border"><div className="p-prod-color p-prod-color-blue"></div></div>
                <div className="p-prod-color-border"><div className="p-prod-color p-prod-color-white"></div></div>
              </div>
              <div className="p-vm-ctc">Have a Question?  <Link to="/contact">Contact Us</Link></div>
            </div>
            <img className="p-vm-img" src={img} alt="product" />
          </div>
        </main>
      )} */}
      <Footer />
    </>
  );
};

export default Buy;
