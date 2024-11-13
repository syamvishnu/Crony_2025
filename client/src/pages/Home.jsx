import React, { useEffect, useState } from "react";
import { Button, Select, Input, Loader } from "semantic-ui-react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { reset, sdrSearch } from "../features/sdrSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const options = [
  { key: "number", text: "Number", value: "Number" },
  { key: "ID", text: "ID", value: "ID" },
];

function Home() {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    number: "",
  });
  const [selectOption, setSelectOption] = useState({
    opt: "Number",
  });
  var sdrData = "";

  const { data, error, loading } = useSelector((state) => state.sdr);
  if (data) {
    sdrData = data.data.numberFound;
    console.log(sdrData.length);
  }

  const { user } = useSelector((state) => state.user);
  console.log(user.roll);

  const handleOption = (e, { name, value }) => {
    setSelectOption({ [name]: value });
  };

  const handleChange = (e) => {
    dispatch(reset());
    const { name, value } = e.target;
    setDetails((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const handleClick = (e) => {
    dispatch(reset());
    e.preventDefault();
    const newData = {
      option: selectOption.opt,
      data: details.number,
      userDetails: user,
    };
    console.log(newData);

    dispatch(sdrSearch(newData));
    setDetails({
      number: "",
    });
    navigate("/result");
  };

  return (
    <div>
      <Navbar />
      <div className="search">
        {loading ? (
          <Loader active inline="centered">
            Loading, Please Wait.....
          </Loader>
        ) : (
          <div>
            <Input
              type="text"
              placeholder="Search..."
              action
              name="number"
              value={details.number}
              onChange={handleChange}
            >
              <input />
              <Select
                style={{ minWidth: "120px", textAlign: "center" }}
                compact
                options={options}
                name="opt"
                value={selectOption.opt}
                onChange={handleOption}
              />

              <Button color="instagram" onClick={handleClick}>
                Search
              </Button>
            </Input>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
