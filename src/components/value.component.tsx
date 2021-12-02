import React from 'react';

type Props = { value: number }

const ValueComponent = (props: Props):JSX.Element => {
  const { value } = props;
  return (
    <>
      R$
      {` ${value.toFixed(2)}`}
    </>
  );
};

export default ValueComponent;
