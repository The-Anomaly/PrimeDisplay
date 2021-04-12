import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./kegennidashboard.css";
import avatar from "../../assets/avatar.svg";
import SideBarNewDashboard from "./SideBarNewDashboard";
import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardNav from "./DashboardNavBar";
import DashboardLargeScreenNav from "./DashboardLargeScreenNav";

class NewDashboardSettings extends React.Component {
  state: any = {
    last_name: "",
    first_name: "",
    errorMessage: "",
    email: "",
    address: "",
    phone: "",
    job_description: "",
    website_link: "",
    successMsg: false,
    isLoading: false,
    isloading: false,
    showWarning: false,
    image: null,
    imageName: "",
    width: 100,
    fillStatus: true,
    uploadLoading: "",
    country: "",
  };
  validateForm = (e) => {
    const {
      first_name,
      last_name,
      email,
      address,
      phone,
      job_description,
      website_link,
      country,
    } = this.state;
    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      address === "" ||
      phone === "" ||
      job_description === "" ||
      country === ""
    ) {
      this.setState({
        fillStatus: false,
      });
      return this.notify("Please fill the required fields");
    } else {
      this.submitForm(e);
      this.setState({
        fillStatus: true,
      });
    }
  };
  handleImageChange = (e) => {
    this.setState({
      // image: e.target.files[0],
      uploadLoading: true,
      imageName: e.target.files[0].name,
    });
    const img = e.target.files[0];
    this.uploadImage(img);
  };
  uploadImage = (img) => {
    const self: any = this;
    const { image } = this.state;
    // console.log(image);
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = new FormData();
    data.append("image", img);
    Axios.post<any, AxiosResponse<any>>(
      `${API}/dashboard/upload-profile-photo`,
      data,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        this.setState({
          uploadLoading: false,
        });
        // console.log(res.data);
        this.notify("Successful");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        this.setState({
          uploadLoading: false,
        });
        // console.log(err.response);
        this.notify("failed");
        if (err) {
          // console.log(err);
        }
      });
  };
  submitForm = (e) => {
    this.setState({
      isloading: true,
    });
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      address,
      phone,
      job_description,
      website_link,
      country,
      image,
    } = this.state;
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken ? JSON.parse(availableToken) : "";
    const data = new FormData();
    // data.append("image", image);
    data.append("last_name", last_name);
    data.append("first_name", first_name);
    data.append("email", email);
    data.append("address", address);
    data.append("phone", phone);
    data.append("country", country);
    data.append("job_description", job_description);
    data.append("website_link", website_link);
    Axios.post<any, AxiosResponse<any>>(`${API}/dashboard/profile`, data, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          this.notify("Successful");
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        this.notify("failed");
        if (err) {
        }
      });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  fileInput: HTMLInputElement | null | undefined;
  componentDidMount() {
    this.setState({ isLoading: true });
    const availableToken = localStorage.getItem("userToken");
    const token = availableToken
      ? JSON.parse(availableToken)
      : window.location.assign("/signin");
    const data = {};
    Axios.get<any, AxiosResponse<any>>(`${API}/dashboard/profile`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          this.setState({
            ...response.data,
          });
        }
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          this.setState({
            errorMessage: error.response.data[0].message,
            isLoading: false,
          });
        }
        this.setState({
          errorMessage: "failed",
          isLoading: false,
        });
      });
  }
  handleRef = (data) => {};
  notify = (message: string) => toast(message, { containerId: "B" });
  render() {
    const {
      fullname,
      email,
      address,
      image,
      phone,
      first_name,
      last_name,
      job_description,
      website_link,
      isloading,
      isLoading,
      imageName,
      uploadLoading,
      country,
    } = this.state;
    console.log(this.state.country);
    return (
      <>
        <Container fluid={true} className="contann122">
          <DashboardNav settings={true} />
          <Row>
            <SideBarNewDashboard settings={true} />
            <Col md={10} sm={12} className="prm newprm">
              <DashboardLargeScreenNav title="Settings" />
              <Row>
                <Col md={11} className="kisls">
                  <div className="kdashheader uidd11">
                    <div className="floo">
                      <div className="smll">
                        {" "}
                        <div className="smalls">
                          <img
                            src={image !== null ? image : avatar}
                            className="avatar avar"
                            alt=""
                          />
                        </div>
                        <div>
                          <input
                            type="file"
                            onChange={this.handleImageChange}
                            style={{ display: "none" }}
                            ref={(fileInput) => (this.fileInput = fileInput)}
                          />
                          <div
                            className="filechan"
                            onClick={() => this.fileInput?.click()}
                          >
                            {uploadLoading ? "Uploading..." : "Upload Image"}
                          </div>
                          {imageName && (
                            <span className="infoforimage">{imageName}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Row>
                    <Col md={12}>
                      <hr />
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            First Name
                            {this.state.fillStatus === false &&
                            first_name === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="first_name"
                            value={first_name}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">
                            Last Name
                            {this.state.fillStatus === false &&
                            last_name === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="last_name"
                            value={last_name}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            Address
                            {this.state.fillStatus === false &&
                            address === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="address"
                            value={address}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">
                            Country
                            {this.state.fillStatus === false &&
                            address === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>   
                          <select id="country" name="country" value={country} className="form-control jobr subhyt" onChange={this.handleChange}>
                          <option value="">--Select a country--</option>
                              <option value="Afghanistan">Afghanistan</option>
                              <option value="Åland Islands">Åland Islands</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American Samoa">American Samoa</option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Anguilla">Anguilla</option>
                              <option value="Antarctica">Antarctica</option>
                              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Aruba">Aruba</option>
                              <option value="Australia">Australia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bermuda">Bermuda</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                              <option value="Botswana">Botswana</option>
                              <option value="Bouvet Island">Bouvet Island</option>
                              <option value="Brazil">Brazil</option>
                              <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                              <option value="Brunei Darussalam">Brunei Darussalam</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Canada">Canada</option>
                              <option value="Cape Verde">Cape Verde</option>
                              <option value="Cayman Islands">Cayman Islands</option>
                              <option value="Central African Republic">Central African Republic</option>
                              <option value="Chad">Chad</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Christmas Island">Christmas Island</option>
                              <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Congo">Congo</option>
                              <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                              <option value="Cook Islands">Cook Islands</option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Cote D'ivoire">Cote D'ivoire</option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czech Republic">Czech Republic</option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">Dominican Republic</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">El Salvador</option>
                              <option value="Equatorial Guinea">Equatorial Guinea</option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                              <option value="Faroe Islands">Faroe Islands</option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="French Guiana">French Guiana</option>
                              <option value="French Polynesia">French Polynesia</option>
                              <option value="French Southern Territories">French Southern Territories</option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Germany">Germany</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Gibraltar">Gibraltar</option>
                              <option value="Greece">Greece</option>
                              <option value="Greenland">Greenland</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guadeloupe">Guadeloupe</option>
                              <option value="Guam">Guam</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guernsey">Guernsey</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guinea-bissau">Guinea-bissau</option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                              <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong Kong">Hong Kong</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Isle of Man">Isle of Man</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jersey">Jersey</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                              <option value="Korea, Republic of">Korea, Republic of</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                              <option value="Liechtenstein">Liechtenstein</option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macao">Macao</option>
                              <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">Marshall Islands</option>
                              <option value="Martinique">Martinique</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mayotte">Mayotte</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                              <option value="Moldova, Republic of">Moldova, Republic of</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montenegro">Montenegro</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar</option>
                              <option value="Namibia">Namibia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherlands">Netherlands</option>
                              <option value="Netherlands Antilles">Netherlands Antilles</option>
                              <option value="New Caledonia">New Caledonia</option>
                              <option value="New Zealand">New Zealand</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Niue">Niue</option>
                              <option value="Norfolk Island">Norfolk Island</option>
                              <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau">Palau</option>
                              <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                              <option value="Panama">Panama</option>
                              <option value="Papua New Guinea">Papua New Guinea</option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Philippines">Philippines</option>
                              <option value="Pitcairn">Pitcairn</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto Rico">Puerto Rico</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Reunion">Reunion</option>
                              <option value="Romania">Romania</option>
                              <option value="Russian Federation">Russian Federation</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Saint Helena">Saint Helena</option>
                              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                              <option value="Saint Lucia">Saint Lucia</option>
                              <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                              <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                              <option value="Samoa">Samoa</option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Serbia">Serbia</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon Islands">Solomon Islands</option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">South Africa</option>
                              <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                              <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Timor-leste">Timor-leste</option>
                              <option value="Togo">Togo</option>
                              <option value="Tokelau">Tokelau</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Emirates">United Arab Emirates</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="United States">United States</option>
                              <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                              <option value="Uruguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Viet Nam">Viet Nam</option>
                              <option value="Virgin Islands, British">Virgin Islands, British</option>
                              <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                              <option value="Wallis and Futuna">Wallis and Futuna</option>
                              <option value="Western Sahara">Western Sahara</option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            Email
                            {this.state.fillStatus === false && email === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">
                            Phone Number
                            {this.state.fillStatus === false && phone === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          />
                        </Col>
                      </Row>
                      <Row className="rowla">
                        <Col md={6}>
                          <div className="whatdoudo">
                            Occupation
                            {this.state.fillStatus === false &&
                            job_description === "" ? (
                              <span className="notfilled"> *</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <textarea
                            name="job_description"
                            value={job_description}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                        <Col md={6}>
                          <div className="whatdoudo">Website Link </div>
                          <textarea
                            name="website_link"
                            value={website_link}
                            onChange={this.handleChange}
                            className="form-control jobr subhyt"
                            placeholder=""
                          ></textarea>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <div
                      className="kskthin col-md-11"
                      onClick={this.validateForm}
                    >
                      {isloading ? "Saving..." : "Save"}
                    </div>
                  </div>
                </Col>
                <ToastContainer
                  enableMultiContainer
                  containerId={"B"}
                  toastClassName="bg-info text-white"
                  hideProgressBar={true}
                  position={toast.POSITION.TOP_CENTER}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default NewDashboardSettings;
