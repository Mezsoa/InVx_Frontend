export const authenticate = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const authenticateRole = () => {
  if (!localStorage.getItem("user")) {
    return false;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role[0] === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};

// DYNAMIC STYLING FOR THE DOLLAR ICON.
export const dollarCoinStyle = { color: "gold", fontSize: "1rem", border: "1px solid gold", borderRadius: "50%", boxShadow: "0.5px 1px 2px black", marginLeft: "5px"  };

export const smallDollarCointStyle = {color: "gold", fontSize: "0.8rem", border: "1px solid gold", borderRadius: "50%", boxShadow: "0.5px 1px 2px black", marginLeft: "5px"  }


