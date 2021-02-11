import * as React from "react";
import { Container } from "react-bootstrap";
import "./wanachat.css";
import NavBar from "../HomeComponents/newnavbar"

const WanaChatBot = () => {
  const [state, setState] = React.useState({
    message: "",
  });
  const { message } = state;
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  console.log(message);
  return (
    <>
      <Container className="wanacontainer" fluid={true}>
          <NavBar />
        <div>
          <div>
            <h1 className="text-center wanattl">Wana Chat Bot</h1>
          </div>
          <div className="texttext">
            <textarea
              name="message"
              value={message}
              className="botinput"
              onChange={onchange}
              placeholder="--Enter a message--"
            ></textarea>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WanaChatBot;
