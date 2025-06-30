import React, { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  const handleValue = ({ target }) => {
    setValue(target.value);
  };
  return [value, handleValue, setValue];
}
export default useInput;
