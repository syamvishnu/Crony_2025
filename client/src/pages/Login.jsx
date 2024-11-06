import React, { useEffect, useState } from "react";
import { Card, Icon, Image, Button, Form } from "semantic-ui-react";
import logo from "../img/1.png";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <Card>
        <Image src={logo} wrapped ui={false} />
        <Card.Content>
          <Form type="submit">
            <Form.Field>
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-last-name"
                label="PEN Number"
                placeholder="PEN Number"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-first-name"
                label="Password"
                placeholder="Password"
                type="password"
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
