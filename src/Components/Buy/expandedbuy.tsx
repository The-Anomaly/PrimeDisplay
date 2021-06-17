import * as React from "react";
import "./buy.css";
import NavBar from "../General/navbar";
import Footer from "../General/footer";
import "../Landing/landing.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpandedBuy = (props: any) => {
  const [state, setState] = React.useState<any>({
    number: 1,
    img: "",
    description: [],
    product_name: "",
  });
  const { number, img, description, product_name } = state;
  const [modState, setModState] = React.useState({
    buy: false,
  });
  const { buy } = modState;
  const closeModal = () => {
    setModState({
      ...modState,
      buy: false,
    })
  }
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
  const goToTectDirect = () => {
    setModState({
      ...modState,
      buy: true,
    });
    setTimeout(() => {
      window.location.href = "http://techdirect.ng/";
      setModState({
        ...modState,
        buy: false,
      });
    }, 2500);
  }
  return (
    <>
      <NavBar buy={true} />
      <main className="padd-main">
        <div className="p-view-ctrl p-padd">
          <div className="p-view-ctrl-1">
            <span className="p-view-details p-view-details-active">
              About Product
            </span>
            {/* <span className="p-view-details">Details</span>
            <span className="p-view-details">Specs</span> */}
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
            <button onClick={goToTectDirect} className="p-buy-btn">Buy</button>
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
          <div className="p-vm-img">
          <img src={img} alt="product" />
          </div>
        </div>
      </main>
      <Footer />
      <Modal className="redirectModal" show={buy} onHide={closeModal} centered>
        <Modal.Body>
            <div className="buy-spinner"></div>
            <h3 className="redirect">Rerouting you to our E-commerce platform...</h3>
        </Modal.Body>
        </Modal>
    </>
  );
};

export default ExpandedBuy;
