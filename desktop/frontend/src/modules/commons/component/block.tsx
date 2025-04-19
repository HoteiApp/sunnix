import React from "react";

const Block: React.FC<Props> = ({ children, active, copy, bg }) => {
  return (
    <>
      {active ? (
        <div
          style={{
            pointerEvents: "none",
            userSelect: copy ? "auto" : "none",
            position: "relative",
          }}
        >
          {children}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: bg ? "rgba(153, 177, 217, 0.54)": "transparent",
              zIndex: 1,
            }}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};
interface Props {
  children: React.ReactNode;
  active?: boolean;
  bg?: boolean;
  copy?: boolean;
}
export { Block };
