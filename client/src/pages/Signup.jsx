import React, { useEffect, useState } from "react";
import { Card, Icon, Image, Button, Checkbox, Form } from "semantic-ui-react";
import logo from "../img/1.png";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

function Signup() {
  const [name, setName] = useState("");
  const [penno, setPenno] = useState("");
  const [password, setPassword] = useState("");
  const [admincode, setAdminCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      penno,
      password,
      admincode,
    };
    dispatch(signUpUser(userData));
  };

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isSuccess, isLoading, navigate, dispatch]);

  return (
    <div className="signup">
      <Card>
        <Image src={logo} wrapped ui={false} />
        <Card.Content>
          <Form type="submit" onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-first-name"
                label="Name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-last-name"
                label="PEN Number"
                placeholder="PEN Number"
                onChange={(e) => setPenno(e.target.value)}
                required
                type="number"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-first-name"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-last-name"
                label="Admin Code"
                placeholder="Admin Code"
                type="password"
                onChange={(e) => setAdminCode(e.target.value)}
                required
              />
            </Form.Group>
            <Button basic color="blue">
              Submit
            </Button>
            ,<p></p>
            <p>
              Already have an account <a href="/">Signin</a>
            </p>
          </Form>
          {isError && <ErrorMessage message={message.message} />}
        </Card.Content>
      </Card>
    </div>
  );
}

export default Signup;
