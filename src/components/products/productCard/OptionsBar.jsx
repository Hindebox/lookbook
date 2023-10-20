import React, { useState } from "react";
import axios from "axios";
import "../../../assets/style/products/product-card.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PopupComponent from "./Popup";

export default function OptionsBar({
  productId,
  onUpdate,
  originalTitle,
  originalDesc,
}) {
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(originalTitle);
  const [editedDescription, setEditedDescription] = useState(originalDesc);

  // DELETE product
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${productId}`
      );
      //fetch updated products
      onUpdate();
    } catch (error) {
      alert(error);
    }
  };

  // EDIT FORM
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${productId}`,
        {
          name: editedTitle,
          description: editedDescription,
        }
      );
      setOpen(false);
      //fetch updated products
      onUpdate();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="optionBar">
      <div className="delete" onClick={handleDelete}>
        <DeleteOutlineIcon className="deleteIcon" />
      </div>
      <div className="edit">
        <div ref={setAnchor} onClick={() => setOpen((o) => !o)}>
          <EditIcon />
        </div>
        <PopupComponent
          anchor={anchor}
          open={open}
          setOpen={setOpen}
          handleFormSubmit={handleFormSubmit}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
        />
      </div>
    </div>
  );
}
