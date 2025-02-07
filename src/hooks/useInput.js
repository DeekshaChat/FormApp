import { useState } from "react";

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isEdit, setIsEdit] = useState(false);
  
  const onChange = (value) => {
    setValue(value);
  };

  function handleBlur() {
    setIsEdit(true);
  }

  return {
      value,
      isEdit,
      onChange,
      handleBlur
  };
}