import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthPage() {
  const history = useHistory();

  const { uesr, saveAuth } = useContext(AuthContext);

  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const start = url?.indexOf("code=") + 5;
      const end = url?.indexOf("#");
      const result = url?.substring(start, end);

      console.log("Login Success, your code is: ", result);

      saveAuth({ code: result });
      history.push("/discover");
      //   history.push("/editor");

      //   const requestData = {
      //     code: newUrl[1],
      //   };
      //   const proxy_url = state.proxy_url;
      //   const proxy_url = "state.proxy_url";

      //   THIS IS FOR OUR API CALL
      // Use code parameter and other parameters to make POST request to proxy_server
      //   fetch(proxy_url, {
      //     method: "POST",
      //     body: JSON.stringify(requestData),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       dispatch({
      //         type: "LOGIN",
      //         payload: { user: data, isLoggedIn: true },
      //       });
      //     })
      //     .catch((error) => {
      //       setData({
      //         isLoading: false,
      //         errorMessage: "Sorry! Login failed",
      //       });
      //     });
    }
  }, [data]);

  return <div>AuthPage</div>;
}
