import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Comment({ comment, setCommentBtn, setCommentId, deleteComment}) {
  const { userData } = useContext(AuthContext);
  return (
    <>
      <div className="space-y-4 flex justify-between">
        <div className="flex items-start gap-3">
          <Avatar img={comment.commentCreator.photo} rounded />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {comment.commentCreator.name}
              </span>
              <span className="text-xs text-gray-400">
                {comment.createdAt.split("T")[0]}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        </div>
        {userData?._id === comment.commentCreator._id && (
          <Dropdown color={"transparent"}>
            <DropdownItem onClick={()=>deleteComment(comment._id)}>Delete</DropdownItem>
            <DropdownItem onClick={()=>{setCommentBtn("update"); setCommentId(comment._id)}}>Edit</DropdownItem>
          </Dropdown>
        )}
      </div>
    </>
  );
}
