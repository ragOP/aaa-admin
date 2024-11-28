import { InputAdornment, TextField } from "@mui/material";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SearchBox = ({
  onChange,
  placeholder,
  value,
  bgColor,
  inputRef,
  disabled = false,
  sx,
  startAdornmentProps = {
    showAdornment: true,
    icon: (
      <MagnifyingGlassIcon
        style={{
          height: "1.25rem",
          width: "1.25rem",
          color: "#000",
        }}
      />
    ),
  },
  endAdornmentProps = {
    showAdornment: false,
    icon: <XMarkIcon />,
  },
  ...props
}) => {
  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      size="small"
      type="text"
      value={value || ""}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      sx={{
        borderRadius: "0.5rem",
        boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.40)",
        "&:hover": {
          boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.60)",
        },
        "& .MuiOutlinedInput-root": {
          backgroundColor: bgColor || "#fff",
          borderRadius: "0.5rem",
          border: "none",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none", 
        },
        "& .MuiInputBase-root": {
          border: "none", 
        },
        "& input": {
          border: "none", 
        },
        ...sx, 
      }}
      InputProps={{
        startAdornment: (
          <>
            {startAdornmentProps?.showAdornment && (
              <InputAdornment position="start">
                {startAdornmentProps.icon}
              </InputAdornment>
            )}
          </>
        ),
        endAdornment: (
          <>
            {endAdornmentProps?.showAdornment && (
              <InputAdornment position="end">
                {endAdornmentProps.icon}
              </InputAdornment>
            )}
          </>
        ),
        style: {
          backgroundColor: bgColor || "#fff",
          height: "2.4rem",
          borderRadius: "0.627rem",
          boxShadow: "none",
          border: "none",
        },
      }}
      {...props}
    />
  );
};

export default SearchBox;
