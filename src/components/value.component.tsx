import React from 'react';

const ValueComponent = (props: { children: number; }): JSX.Element => {
  const { children } = props;
  return (
    <>
      {`R$${children.toFixed(2)}`}
    </>
  );
};

export default ValueComponent;
