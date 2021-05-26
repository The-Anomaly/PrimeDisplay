import * as React from "react";
import "./buy.css";
import NavBar from "../General/navbar";
import Footer from "../General/footer";
import "../Landing/landing.css";
import product from "../../assets/product.png";

const Buy = () => {
  const [state, setState] = React.useState<any>({
    switchIt: true,
    number: 1,
  });
  const { switchIt, number } = state;
  const handleChange = (e: any) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
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
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
            </div>
          </div>
          <div className="p-buy-products p-marg">
            <h5 className="p-buy-sec1-ttl">Projectors</h5>
            <div className="p-buy-itemsec">
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
              <div className="p-buy-items">
                <img src={product} alt="" />
                <h6 className="p-buy-products-hd">6000x Series</h6>
                <p className="p-buy-products-descrip">
                  Odio etiam nunc, lacus et bibendum id. Mauris pharetra, neque
                  integer eu.
                </p>
                <a className="p-buy-products-link">View More</a>
              </div>
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
              <button className="p-viewmore-backbtn">Go Back</button>
              <div className="p-viewmore-progress">
                <span>Home</span> › <span>Buy</span> ›{" "}
                <span>Gx Pro Series</span>
              </div>
              <h2 className="p-vm-ttl">Gx Pro Series</h2>
              <p className="p-vm-descrip">
                Pulvinar risus etiam viverra elit. Risus orci proin magna tellus
                nunc, facilisis. Odio etiam nunc, lacus et bibendum id. Mauris,
                a, pharetra, neque integer eu. Gllus nunc, facilisis. Odio etiam
                nunc, lacus et bibendum id. Mauris, a, pharetra, neque integer
                eu.
              </p>
              <div className="p-colorsec">
                <div className="p-prod-color-border p-prod-color-active"><div className="p-prod-color p-prod-color-black"></div></div>
                <div className="p-prod-color-border"><div className="p-prod-color p-prod-color-blue"></div></div>
                <div className="p-prod-color-border"><div className="p-prod-color p-prod-color-white"></div></div>
              </div>
              <div className="p-vm-ctc">Have a Question?  <a>Contact Us</a></div>
            </div>
            <img className="p-vm-img" src={product} alt="product" />
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Buy;
