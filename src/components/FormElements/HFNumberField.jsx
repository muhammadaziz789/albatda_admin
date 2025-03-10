import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const HFNumberField = ({
  control,
  name = "",
  disabledHelperText = false,
  isBlackBg = false,
  isFormEdit = false,
  required = false,
  fullWidth = false,
  withTrim = false,
  rules = {},
  defaultValue = "",
  disabled,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: required ? "This is required field" : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          size="small"
          value={value}
          onChange={(e) => {
            const val = e.target.value;

            if (!val) onChange("");
            else onChange(!isNaN(Number(val)) ? Number(val) : "");
          }}
          className={`${isFormEdit ? "custom_textfield" : ""}`}
          name={name}
          error={error}
          fullWidth={fullWidth}
          helperText={!disabledHelperText && error?.message}
          onWheel={() => document.activeElement.blur()}
          InputProps={{
            readOnly: disabled,
            style: disabled
              ? {
                  background: "#c0c0c039",
                }
              : {
                  background: isBlackBg ? "#2A2D34" : "",
                  color: isBlackBg ? "#fff" : "",
                },
          }}
          {...props}
        />
      )}
    ></Controller>
  );
};

export default HFNumberField;
