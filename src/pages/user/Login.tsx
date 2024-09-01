import { useState } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import LoginForm from "../../components/user/LoginForm";
import RegisterForm from "../../components/user/RegisterForm";

const Login = () => {
  const [signInOrUp, setSignInOrUp] = useState("login");

  const handleChange = (_:any, newValue:string) => {
    setSignInOrUp(newValue);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <div className="bg-white rounded-lg p-8 shadow-xl w-auto">
            <div className="flex flex-col items-center justify-center md:flex-row lg:flex-row xl:flex-row">
          <Typography variant="h4" gutterBottom>
            Welcome to
          </Typography>
          <img
            src="/dreambuylogo.png"
            alt="dreambuylogo"
            className="w-15 h-9 ml-2 md:ml-0 lg:ml-0 xl:ml-0 md:mt-0 lg:mt-0 xl:mt-0" // Adjusted margin for medium screens and above
          />
        </div>
          <Tabs
            value={signInOrUp}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            className="mt-4"
          >
            <Tab label="SignIn" value="login" />
            <Tab label="SignUp" value="signup" />
          </Tabs>

          {signInOrUp === "signup" ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </>
  );
};

export default Login;
