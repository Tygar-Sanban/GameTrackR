import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SendAFriend() {
  return (
    <div style={{ textAlign: "center" }}>
      <i>
        {canUse ? (
          played ? (
            <>
              <FontAwesomeIcon
                icon="fa-solid fa-gamepad"
                size="10x"
                style={{ color: "#0B7A75" }}
                onClick={handleDisPlay}
              />
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  position: "absolute",
                  color: "#0B7A75",
                  fontSize: "3em",
                }}
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon="fa-solid fa-gamepad"
                size="10x"
                style={{ color: "#8bc6ef" }}
                onClick={handlePlayClick}
              />
            </>
          )
        ) : (
          <div>
            You need to be logged to interract with the game.{" "}
            <Link to="/log-in">
              <h4>Log in ?</h4>
            </Link>{" "}
          </div>
        )}
      </i>
      <h4 style={{ marginTop: "1rem" }}>Played it ?</h4>
    </div>
  );
}

export default SendAFriend;
