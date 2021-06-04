import * as React from "react";
import "./buy.css";
import NavBar from "../General/navbar";
import Footer from "../General/footer";
import "../Landing/landing.css";
import { Link } from "react-router-dom";

const ExpandedBuy = (props: any) => {
  const [state, setState] = React.useState<any>({
    number: 1,
    img: "",
    description: [],
    product_name: "",
  });
  const { number, img, description, product_name } = state;
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    setState({
      ...state,
      switchIt: true,
      img: props?.location?.state?.img,
      description: props?.location?.state?.description,
      product_name: props?.match?.params?.product,
    });
  }, []);
  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const goBack = () => {
    return props.history.push("/buy");
  };
  return (
    <>
      <NavBar buy={true} />
      <main>
        <div className="p-view-ctrl p-padd">
          <div className="p-view-ctrl-1">
            <span className="p-view-details p-view-details-active">
              About Product
            </span>
            <span className="p-view-details">Details</span>
            <span className="p-view-details">Specs</span>
          </div>
          <div className="p-view-ctrl-2">
            {/* <span>
              On Sale from <b>$3,299.00</b>
            </span> */}
            {/* <input
              className="p-buy-num"
              name="number"
              onChange={handleChange}
              value={number}
              type="number"
            /> */}
            <a href="http://techdirect.ng/" className="p-buy-btn">Buy</a>
          </div>
        </div>
        <div className="p-viewmore">
          <div className="p-viewmore-1">
            <button className="p-viewmore-backbtn" onClick={goBack}>
              Go Back
            </button>
            <div className="p-viewmore-progress">
              <span>Home</span> › <span>Buy</span> › <span>{product_name}</span>
            </div>
            <h2 className="p-vm-ttl">{product_name}</h2>
            <p className="p-vm-descrip">
              {description.map((x: string, i: any) => (
                <div key={i}>{x}</div>
              ))}
            </p>
            {/* <div className="p-colorsec">
              <div className="p-prod-color-border p-prod-color-active">
                <div className="p-prod-color p-prod-color-black"></div>
              </div>
              <div className="p-prod-color-border">
                <div className="p-prod-color p-prod-color-blue"></div>
              </div>
              <div className="p-prod-color-border">
                <div className="p-prod-color p-prod-color-white"></div>
              </div>
            </div> */}
            <div className="p-vm-ctc">
              Have a Question? <Link to="/contact">Contact Us</Link>
            </div>
          </div>
          <img className="p-vm-img" src={img} alt="product" />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExpandedBuy;
