import { Clear, Today } from "@mui/icons-material"
import { InputAdornment, TextField } from "@mui/material"
import DatePicker from "react-multi-date-picker"
import CustomNavButton from "./Plugins/CustomNavButton"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"
import { locale } from "./Plugins/locale"

const CRangePickerNew = ({ onChange, value, placeholder }) => {
  const changeHander = (val) => {
    if (val === undefined) {
      onChange(undefined);
      return;
    }
    if (!val?.length) onChange([]);
    else {
      onChange({
        $gte: new Date(val[0]),
        $lte: new Date(val[1]),
      })
    }
  }

  return (
    <DatePicker
      render={(value, openCalendar, handleChange) => {
        return (
          <TextField
            value={value}
            onClick={openCalendar}
            onChange={handleChange}
            size="small"
            fullWidth
            autoComplete="off"
            placeholder={placeholder}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {value?.length ? <Clear
                    style={{ cursor: "pointer" }}
                    onClick={() => changeHander(undefined)}
                  /> : ''}
                  <Today />
                </InputAdornment>
              ),
            }}
          />
        )
      }}
      range
      renderButton={<CustomNavButton />}
      plugins={[weekends()]}
      weekStartDayIndex={1}
      portal
      locale={locale}
      className="datePicker"
      format="DD.MM.YYYY"
      numberOfMonths={2}
      onChange={changeHander}
      value={Object.values(value ?? {})}
      // onChange={(val) => onChange(val ? new Date(val) : "")}
    />
  )
}

export default CRangePickerNew
