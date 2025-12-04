import React, { PropsWithChildren } from "react";

const Template = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
      foo
    </div>
  );
};

export default Template;
