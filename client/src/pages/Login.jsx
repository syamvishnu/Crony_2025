import React, { useEffect, useState } from "react";
import { Card, Icon, Image, Button, Form } from "semantic-ui-react";
import logo from "../img/1.png";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinUser, reset } from "../store/authSlice";

function Login() {
  const [penno, setPenno] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      penno,
      password,
    };
    dispatch(signinUser(userData));
  };

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, navigate, dispatch]);

  return (
    <div className="login">
      <Card>
        <Image src={logo} wrapped ui={false} />
        <Card.Content>
          <Form type="submit" onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-last-name"
                label="PEN Number"
                placeholder="PEN Number"
                onChange={(e) => setPenno(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-first-name"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>
            <Button basic color="blue">
              Submit
            </Button>
            ,<p></p>
            <p>
              Need to <a href="/signup">SignUp</a>
            </p>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Login;
