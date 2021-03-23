import Axios, { AxiosResponse } from "axios";
import { API } from "../../config";

export const handleChatCheck = () => {
  // console.log("checking payment status");
  const availableToken = localStorage.getItem("userToken");
  const token = availableToken
    ? JSON.parse(availableToken)
    : window.location.assign("/signin");
  Axios.get<any, AxiosResponse<any>>(`${API}/paymentstatus`, {
    headers: { Authorization: `Token ${token}` },
  })
    .then((response) => {
      // console.log(response);
      if (response?.data[0]?.ask_counsellor === true) {
        return  window.location.assign("/allusermessages");;
      }
      if (response?.data[0]?.profile_builder_submitted === false) {
        return;
      }
    })
    .catch((error) => {
      // console.log(error);
      // console.error("Payment Status Error");
    });
};
