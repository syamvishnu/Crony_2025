import React from "react";
import DataTable from "react-data-table-component";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function UserLogTable({ columns, title, userLog }) {
  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  return (
    <div>
      <Segment placeholder>
        <Header icon>{title}</Header>
        <DataTable columns={columns} data={userLog} selectableRows pagination />
      </Segment>
    </div>
  );
}

export default UserLogTable;
