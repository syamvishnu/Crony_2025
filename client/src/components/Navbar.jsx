import React from "react";
import {
  DropdownMenu,
  DropdownItem,
  MenuMenu,
  MenuItem,
  Button,
  Dropdown,
  Menu,
  Image,
  ButtonContent,
  Icon,
} from "semantic-ui-react";
import logo1 from "../img/cbdm.jpg";
import logo2 from "../img/ana.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { logOutUser, reset } from "../features/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <Menu size="massive">
        <MenuItem>
          <Link to="/">
            <Image size="small" src={logo1} />
          </Link>
        </MenuItem>
        <MenuItem name="features">
          <Link to="/keyword">Keyword Search</Link>
        </MenuItem>
        <MenuMenu position="right">
          <div
            style={{
              paddingTop: "20px",
              paddingRight: "30px",
              width: "185px",
              display: "flex",
            }}
          >
            <Dropdown
              style={{ color: "#347C98", paddingRight: "90px" }}
              item
              trigger={
                <Image
                  size="small"
                  src={logo2}
                  style={{ width: "55px", height: "35px" }}
                />
              }
              icon={null}
            >
              <DropdownMenu>
                <DropdownItem>
                  <UserCard onLogout={onLogout} />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </MenuMenu>
      </Menu>
    </div>
  );
}

export default Navbar;
