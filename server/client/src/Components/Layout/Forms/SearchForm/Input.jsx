import { Box } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";

function Input({ classes, setValue, value, options, setError }) {
  const [display, setDisplay] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <Box ref={wrapperRef} className={classes.suggestionInput}>
      <OutlinedInput
        // style={{"}}
        style={{ border: "1px solid grey", width: "100%" }}
        className={classes.input}
        onKeyUp={() => setDisplay(value !== "" ? true : false)}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setError(false);
        }}
      />
      {display && (
        <div
          style={{ position: "absolute", width: "195px" }}
          className={classes.autocontainer}
        >
          {options
            ?.filter(
              (option) => option.toLowerCase().indexOf(value.toLowerCase()) > -1
            )
            .map((option, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setValue(option);
                    setDisplay(false);
                  }}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <span style={{ marginLeft: "15px" }}>{option}</span>
                </div>
              );
            })}
        </div>
      )}
    </Box>
  );
}

export default Input;
