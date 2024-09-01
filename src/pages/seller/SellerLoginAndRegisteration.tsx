import React, { useState } from "react";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import Register from "../../components/seller/Register";
import Loginn from "../../components/seller/Login";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const tabData = [
  { label: "Login", value: "login", icon: LoginIcon },
  { label: "Register", value: "register", icon: HowToRegIcon }
];

const SellerLoginAndRegistration = () => {
  const [signInOrUp, setSignInOrUp] = useState("login");
  const [showModal,setShowModal] = useState(false)

  const handleChange = (_:any, newValue:string) => {
    setSignInOrUp(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', padding:3}}>
      <Tabs
        value={signInOrUp}
        onChange={handleChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        aria-label="login and registration tabs"
        sx={{ backgroundColor: 'lightgray', borderRadius: '4px', width: '100%', maxWidth: '400px', mx: 'auto' }}
      >
        {tabData.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            sx={{ width: '50%' }}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {React.createElement(icon, { className: "w-5 h-5" })}
                <Typography variant="button">{label}</Typography>
              </Box>
            }
          />
        ))}
      </Tabs>
      <Box sx={{ width: '100%', mt: 3}}>
        {signInOrUp === "login" && <Loginn showModal={showModal} setShowModal={setShowModal}/>}
        {signInOrUp === "register" && <Register showModal={showModal} setShowModal={setShowModal}/>}
      </Box>
    </Box>
  );
};

export default SellerLoginAndRegistration