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
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard"
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
          <Link to="/key">Keyword Search</Link>
        </MenuItem>

        <MenuMenu position="right">
          <div
            style={{ paddingTop: "20px", paddingRight: "30px", width: "185px" }}
          >
            <Dropdown style={{ color: "#347C98" }} item >
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
