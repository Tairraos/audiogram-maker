import React, { useMemo } from "react";

export const AudioVizContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const containerStyle: React.CSSProperties = useMemo(
    () => ({
      display: "flex",
      flexDirection: "row",
      height: `125px`,
      alignItems: "center",
      justifyContent: "center",
      gap: `5px`,
      margin: `22px 1px 25px`,
    }),
    [],
  );

  return <div style={containerStyle}>{children}</div>;
};
