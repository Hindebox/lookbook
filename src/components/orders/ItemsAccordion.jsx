import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { formControlLabelClasses } from "@mui/material";
import axios from "axios";

export default function ItemsAccordion({
  products,
  handleDel,
  orderID,
  orderUsers,
  deleteOrder,
}) {
  const [items, setItems] = useState({
    products: products.map((prod) => prod.data._id),
    users: orderUsers,
  });

  const handleClick = async (e, id) => {
    e.preventDefault();

    //make availabale the removed item
    await axios.put(`http://localhost:2000/products/${id}`, {
      availability: true,
    });

    //filter products remove the product
    const newProducts = items.products.filter((item) => item !== id);

    // setItems(newItems);
    setItems({ ...items, products: newProducts });
    const newOrder = { ...items, products: newProducts };

    //update the order with new items
    await axios.put(`http://localhost:2000/swapOrders/${orderID}`, newOrder);

    handleDel();
  };

  //if you delete the last item in order the order itselt is deleted
  React.useEffect(() => {
    if (items.products.length === 0) deleteOrder();
    console.log(items.products.length);
  }, [items]);

  return (
    <div className="accordion">
      <Accordion>
        {/* ACCORIDON HEADER */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="expandIcon" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordionHeader">
            <p className="itemsTitle">
              <span>{products.length}</span> ITEMS
            </p>
            <div className="itemsImgs">
              {products.map((prod) => (
                <img
                  src={prod.data.photos[0]}
                  key={uuidv4()}
                  className="productsPreviwe"
                />
              ))}
            </div>
          </div>
        </AccordionSummary>

        {/* ACCORDION CONTENT */}
        {products.map((prod) => (
          <AccordionDetails className="accordionItems" key={uuidv4()}>
            <div className="img-name">
              <img src={prod.data.photos[0]} alt="" />
              <h4>{prod.data.name}</h4>
            </div>
            <DeleteOutlineIcon
              className="deleteOrderItem"
              onClick={(e) => handleClick(e, prod.data._id)}
            />
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}
