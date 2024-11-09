import React from "react";
import "./Display.css";
import {
  Button,
  Modal,
  Image,
  Table,
  Message,
  Loader,
  Header,
  Rating,
} from "semantic-ui-react";
import img from "../img/1.png";
import { reset, sdrSearch } from "../features/sdrSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Dispaly() {
  var sdrData = "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);

  const { data, error, loading, succes } = useSelector((state) => state.sdr);

  if (data) {
    sdrData = data.data.numberFound;
  }

  const handleBack = () => {
    dispatch(reset);
    navigate("/");
  };

  return (
    <div className="search">
      {loading ? (
        <Loader active inline="centered">
          Loading, Please Wait.....
        </Loader>
      ) : (
        <Modal
          style={{ minWidth: "1500px" }}
          onClose={() => {
            dispatch(reset);
            navigate("/");
          }}
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header>{!error ? sdrData.tnumber : <h3></h3>}</Modal.Header>
          {!error ? (
            <div>
              {sdrData.length >= 1 ? (
                <div>
                  <Modal.Content image>
                    <div>
                      <Table celled padded>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell singleLine>
                              Number
                            </Table.HeaderCell>
                            <Table.HeaderCell>Subscriber Name</Table.HeaderCell>
                            <Table.HeaderCell>Father's Name</Table.HeaderCell>
                            <Table.HeaderCell>Address Proof</Table.HeaderCell>
                            <Table.HeaderCell>
                              Alternative Number
                            </Table.HeaderCell>
                            <Table.HeaderCell>DOB</Table.HeaderCell>
                            <Table.HeaderCell>Activation Date</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        {sdrData.map((val) => {
                          return (
                            <Table.Body key={val.tnumber}>
                              <Table.Row>
                                <Table.Cell>{val.tnumber}</Table.Cell>
                                <Table.Cell singleLine>
                                  {val.subscribername}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  {val.fatherhusname}
                                </Table.Cell>
                                <Table.Cell>
                                  {val.aadhaar ? val.aadhaar : val.addressproff}
                                </Table.Cell>
                                <Table.Cell singleLine>
                                  {val.alternative}
                                </Table.Cell>
                                <Table.Cell singleLine>{val.dob}</Table.Cell>
                                <Table.Cell singleLine>
                                  {val.activationdate}
                                </Table.Cell>
                                <Table.Cell>{val.permanantaddress}</Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          );
                        })}
                      </Table>
                    </div>
                  </Modal.Content>
                </div>
              ) : (
                <div style={{ padding: "50px", display: "flex" }}>
                  <Image size="medium" src={img} />
                  <Modal.Content image>
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Subscriber Number</Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.tnumber}
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Subscriber Name</Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.subscribername}
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Father's Name</Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.fatherhusname}
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Address Proof</Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.aadhaar
                              ? sdrData.aadhaar
                              : sdrData.addressproff}
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Address</Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.ad2}&nbsp;{sdrData.ad3}&nbsp;{sdrData.ad5}
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>
                            Alternative Number
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.alternative}
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>DOB</Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.dob}
                          </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell>Activation Date</Table.HeaderCell>
                          <Table.HeaderCell
                            basic
                            style={{ textAlign: "center" }}
                          >
                            {sdrData.activationdate}
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                    </Table>
                  </Modal.Content>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center " }}>
              <Modal.Header>
                <Message negative>
                  <Message.Header>No Data Found</Message.Header>
                  <p>Please check the number</p>
                </Message>
              </Modal.Header>
            </div>
          )}
          <Modal.Actions>
            <Button color="black" onClick={handleBack}>
              Back
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
}

export default Dispaly;
