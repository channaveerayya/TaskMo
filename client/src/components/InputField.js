import React from "react"
import { FormControl, OutlinedInput, InputLabel } from "@material-ui/core"

function InputField({
  title,
  name,
  value,
  handleOnChange,
  labelWidth = 70,
  multi = false,
  row = 5,
  styles,
  type = "text",
  required = false,
}) {
  return (
    <FormControl className={styles} variant="outlined" fullWidth>
      <InputLabel htmlFor={`outlined-adornment- ${name}`}>{title}</InputLabel>
      <OutlinedInput
        id={`outlined-adornment- ${name}`}
        value={value}
        name={name}
        multiline={multi}
        rows={row}
        onChange={handleOnChange}
        labelWidth={labelWidth}
        type={type}
        required={required}
      />
    </FormControl>
  )
}
export default InputField
