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


function Navbar() {
  

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
                 <UserCard />
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
