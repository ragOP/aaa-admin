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
          border: "none", // Prevents external borders
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none", // Removes Material-UI's default outline
        },
        "& .MuiInputBase-root": {
          border: "none", // Removes any internal input borders
        },
        "& input": {
          border: "none", // Removes border inside input
        },
        ...sx, // Allows additional customization
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
          backgroundColor: bgColor || "#fff", // Matches the outer styling
          borderRadius: "0.627rem", // Custom border-radius
          boxShadow: "none", // No shadow for the input area
          border: "none", // Ensures no inline border
        },
      }}
      {...props}
    />
  );
};

export default SearchBox;
