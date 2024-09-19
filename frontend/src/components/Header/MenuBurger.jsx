import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./menuBurger.css";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      fontFamily: "Black Ops One",
    },
  });
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          className="Burger-Button"
          xmlns="http://www.w3.org/2000/svg"
          height="50"
          viewBox="0 -960 960 960"
          width="50"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </Button>
      <ThemeProvider theme={theme}>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            className="Police-Burger-Header"
            onClick={() => {
              navigate("/homepage");
            }}
          >
            HOME
          </MenuItem>

          <MenuItem
            className="Police-Burger-Header"
            onClick={() => {
              navigate("/spotzone");
            }}
          >
            STROLLS
          </MenuItem>

          <MenuItem
            className="Police-Burger-Header"
            onClick={() => {
              navigate("/contactus");
            }}
          >
            CONTACT
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </div>
  );
}
