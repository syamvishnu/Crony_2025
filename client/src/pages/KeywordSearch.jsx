import React, { useState } from "react";
import {
  Container,
  Grid,
  Button,
  Loader,
  FormInput,
  FormGroup,
  Form,
} from "semantic-ui-react";
import "./keywordsearch.css";
import { useDispatch, useSelector } from "react-redux";
import { reset, keySearch } from "../features/keywordSlice";
import { useNavigate } from "react-router-dom";
import kk from "../components/Tables";
import Navbar from "../components/Navbar";
function Keywordsearch() {
  const [name, setName] = useState("");
  const [key1, setKey1] = useState("");
  const [father1, setFather1] = useState("");
  const [email1, setEmail1] = useState("");
  // const [key2, setKey2] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, loading, success } = useSelector((state) => state.key);
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryData = {
      key2: name,
      key1,
      father1,
      email1,
      userDetails: user,
    };
    console.log(queryData);

    setName("");
    setKey1("");

    dispatch(keySearch(queryData));
    navigate("/table");
  };

  return (
    <div>
      <Navbar />
      <Container className="keyword">
        <Grid centered>
          <Grid.Column width={6}>
            <Form>
              <FormGroup widths="equal">
                <FormInput
                  fluid
                  id="form-subcomponent-shorthand-input-first-name"
                  label="Name"
                  placeholder="enter name"
                  onChange={(e) => setName(e.target.value)}
                />
                <FormInput
                  fluid
                  id="form-subcomponent-shorthand-input-last-name"
                  label="Father"
                  placeholder="Enter Father Name"
                  onChange={(e) => setFather1(e.target.value)}
                />
              </FormGroup>
              <FormGroup widths="equal">
                <FormInput
                  fluid
                  id="form-subcomponent-shorthand-input-last-name"
                  label="Email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail1(e.target.value)}
                />
                <FormInput
                  fluid
                  id="form-subcomponent-shorthand-input-last-name"
                  label="Keyword"
                  placeholder="Enter First Keyword"
                  onChange={(e) => setKey1(e.target.value)}
                />
              </FormGroup>
              <Button color="instagram" onClick={handleSubmit}>
                Search
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default Keywordsearch;
