import React from "react";
import { MessageHeader, Message } from "semantic-ui-react";

function ErrorMessage({ message }) {
  return (
    <div>
      <Message negative>
        <MessageHeader>{message}</MessageHeader>
      </Message>
    </div>
  );
}

export default ErrorMessage;
