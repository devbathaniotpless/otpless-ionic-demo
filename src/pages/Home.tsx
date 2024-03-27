import React, { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import "./Home.css";
import { OtplessManager } from "otpless-ionic";
import "../pages/Home.css";

const Home: React.FC = () => {
  const [token, setMyToken] = useState("");
  // Function to update the string value
  const updateString = (userToken: string) => {
    setMyToken(userToken);
  };
  const manager = new OtplessManager();
  // This code will be used to detect the whatsapp installed status in users device
  // If you are using WHATSAPP login then its reqiured to add this code to hide the OTPless functionality
  const isWhatsappInstalled = async () => {
    const hasWhatsapp = await manager.isWhatsappInstalled();
    console.log(hasWhatsapp);
  };
  const openLoginPage = async () => {
    try {
      const extras = {
        method: "get",
        params: {
          cid: "HRIRBIIKXMKEOTDDA8VV4HP2V24454X8", //Add your own CID value provided in the docs otpless.com/platforms/ionic
          appId: "AX5H8YDKQ2CNH6YR6M78", //Add your own appId value provided in the docs otpless.com/platforms/ionic
        },
      };
      isWhatsappInstalled();
      const data = await manager.showOtplessLoginPage(extras);

      if (data.data === null || data.data === undefined) {
        console.error(data.errorMessage);
      } else {
        updateString(data.data.token);
        // TODO: Add your logic here
        // For example, setRedirectToHome(true) to redirect to the home page
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <IonPage>
      <div className="column">
        <div className="row">
          <div className="tokentitleTextstyle">Token : </div>
          <div className="tokenTextStyle"> {token}</div>
        </div>
        <button onClick={openLoginPage} className="button">
          Login
        </button>
      </div>
    </IonPage>
  );
};

export default Home;
