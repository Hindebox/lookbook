import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../../assets/style/global.scss";

export default function DeleteBtn({ onClick, deleteText }) {
  return (
    <button className="deleteBtn" onClick={onClick}>
      <DeleteOutlineIcon />
      {deleteText}
    </button>
  );
}
