import { Dropdown, DropdownItem } from "flowbite-react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function DropdownActions(props) {
  const { userData } = useContext(AuthContext);
  const id = userData?._id;

  return (
    <>
      <Dropdown color={"transparent"} >
        {id === props.userId && (
          <>
          <DropdownItem onClick={props.delete}>Delete</DropdownItem>
          <DropdownItem>Edit</DropdownItem>
          </>
        )}
        <DropdownItem onClick={props.save}>Save Post</DropdownItem>
      </Dropdown>
    </>
  );
}
