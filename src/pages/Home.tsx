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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const manager = new OtplessManager();
        const extras = {
          method: "get",
          params: {
            cid: "HRIRBIIKXMKEOTDDA8VV4HP2V24454X8", //Add your own CID value provided in the docs otpless.com/platforms/ionic
            crossButtonHidden: "true",
          },
        };

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
    fetchData();
  }, []);
  return (
    <IonPage>
      <div className="row">
        <div className="tokentitleTextstyle">Token : </div>
        <div className="tokenTextStyle"> {token}</div>
      </div>
    </IonPage>
  );
};

export default Home;
