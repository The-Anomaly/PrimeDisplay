import * as React from "react";
import "./buy.css";
import NavBar from "../General/navbar";
import Footer from "../General/footer";
import "../Landing/landing.css";
import product from "../../assets/product.png";
import product2 from "../../assets/product2.png";

const screens = [
    {
        id: 0,
        name: "Gx series 6",
        descrip: "short description, short description",
        image: product,
    },
    {
        id: 1,
        name: "Gx Pro series 6",
        descrip: "short description, short description Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque",
        image: product2,
    },
    {
        id: 2,
        name: "Gx Max series 6",
        descrip: " Odio etiam nunc, lacus et bibendum idshort description, short description",
        image: product,
    },
    {
        id: 3,
        name: "Sx series 8",
        descrip: "short description Odio etiam nunc, lacus et bibendum id, short description",
        image: product2,
    }
]

const projectors = [
    {
        id: 0,
        name: "K9 series",
        descrip: "short description, short description",
        image: product,
    },
    {
        id: 1,
        name: "Tazer Pro",
        descrip: "short description, short description Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque",
        image: product2,
    },
    {
        id: 2,
        name: "Audi Max",
        descrip: " Odio etiam nunc, lacus et bibendum idshort description, short description",
        image: product,
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
  const viewMore = (x: any) => {
      window.scrollTo(-0, -0);
      setState({
          ...state,
          switchIt: true,
          img: x.image,
          description: x.descrip,
          product_name: x.name,
      })
  }
  const goBack = () => {
    window.scrollTo(-0, -0);
      setState({
          ...state,
          switchIt: false,
      })
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
                  {x.descrip}
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
                  {x.descrip}
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
      {switchIt && (
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
              <div className="p-vm-ctc">Have a Question?  <a>Contact Us</a></div>
            </div>
            <img className="p-vm-img" src={img} alt="product" />
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Buy;
