import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Unstable_Popup as Popup } from "@mui/base/Unstable_Popup";
import CloseIcon from "@mui/icons-material/Close";

function PopupComponent(props) {
  const {
    anchor,
    open,
    setOpen,
    handleFormSubmit,
    editedTitle,
    setEditedTitle,
    editedDescription,
    setEditedDescription,
  } = props;

  return (
    <Popup className="popupBody" anchor={anchor} open={open} withTransition>
      {(props) => (
        <PopAnimation {...props}>
          <PopAnimation {...props}>
            <form onSubmit={handleFormSubmit}>
              <div className="cancelChangesBtn" onClick={() => setOpen(false)}>
                <CloseIcon />
              </div>

              <input
                type="text"
                id="editedTitle"
                placeholder="Title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />

              <input
                type="text"
                id="editedDescription"
                placeholder="Description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />

              <button className="saveChangesBtn" type="submit">
                Save
              </button>
            </form>
          </PopAnimation>
        </PopAnimation>
      )}
    </Popup>
  );
}

function Animated(props) {
  const { requestOpen, onEnter, onExited, children, className } = props;

  useEffect(() => {
    if (requestOpen) {
      onEnter();
    }
  }, [onEnter, requestOpen]);

  const handleAnimationEnd = useCallback(() => {
    if (!requestOpen) {
      onExited();
    }
  }, [onExited, requestOpen]);

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={className + (requestOpen ? " open" : " close")}
    >
      {children}
    </div>
  );
}

Animated.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired,
  requestOpen: PropTypes.bool.isRequired,
};

//POPUP ANIMATION
const PopAnimation = styled(Animated)`
  @keyframes open-animation {
    0% {
      opacity: 0;
      transform: translate(0, -8px);
    }

    50% {
      opacity: 1;
      transform: translate(0, 4px);
    }

    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes close-animation {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }

    50% {
      opacity: 1;
      transform: translate(0, 4px);
    }

    100% {
      opacity: 0;
      transform: translate(0, -8px);
    }
  }

  &.open {
    animation: open-animation 0.4s ease-in forwards;
  }

  &.close {
    animation: close-animation 0.4s ease-in forwards;
  }
`;

export default PopupComponent;
