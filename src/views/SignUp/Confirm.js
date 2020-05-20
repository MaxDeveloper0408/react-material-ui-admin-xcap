import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"

// Destructure props
const Confirm = ({
  classes,
  handleNext,
  handleBack,
  handleChange,
  submit,
  values: { street, number, complement, neighborhood, city, state, investment},
  filedError,
  isError
}) => {
  // Check if all values are not empty
  const isEmpty = city.length > 0 
                  && street.length > 0
                  && number.length > 0
                  && complement.length >= 0
                  && neighborhood.length > 0
                  && city.length > 0
                  && state.length > 0
                  && investment.length > 0
  const isNumber = number.length > 1 && number.length < 6;                  
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street"
            name="street"
            placeholder="Enter your street"
            defaultValue={street}
            onChange={handleChange("street")}
            margin="normal"
            error={filedError.street !== ""}
            helperText={filedError.street !== "" ? `${filedError.street}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Number"
            name="number"
            placeholder="Enter your number"
            defaultValue={number}
            onChange={handleChange("number")}
            margin="normal"
            error={filedError.number !== "" || !isNumber}
            helperText={filedError.number !== "" || !isNumber ? "Minimum 2 and Maxmum 5 numbers required" : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Complement"
            name="complement"
            placeholder="Enter your complement"
            defaultValue={complement}
            onChange={handleChange("complement")}
            margin="normal"
            error={filedError.complement !== ""}
            helperText={filedError.complement !== "" ? `${filedError.complement}` : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Neighbor"
            name="neighborhood"
            placeholder="Enter your neighborhood"
            defaultValue={neighborhood}
            onChange={handleChange("neighborhood")}
            margin="normal"
            error={filedError.neighborhood !== ""}
            helperText={filedError.neighborhood !== "" ? `${filedError.neighborhood}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputProps={{
              className: classes.colorWhite
            }}
            InputLabelProps={{
              className: classes.colorWhite
            }}
            fullWidth
            label="City"
            name="city"
            placeholder="Enter your city"
            defaultValue={city}
            onChange={handleChange("city")}
            margin="normal"
            error={filedError.city !== ""}
            helperText={filedError.city !== "" ? `${filedError.city}` : ""}
            disabled
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputProps={{
              className: classes.colorWhite
            }}
            InputLabelProps={{
              className: classes.colorWhite
            }}
            fullWidth
            label="Sate"
            name="state"
            placeholder="Enter your state"
            defaultValue={state}
            onChange={handleChange("state")}
            margin="normal"
            error={filedError.state !== ""}
            helperText={filedError.state !== "" ? `${filedError.state}` : ""}
            disabled
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="investment">Investment</InputLabel>
            <Select value={investment} onChange={handleChange("investment")}>
              <MenuItem value={"5.000-10.000"}>5.000-10.000</MenuItem>
              <MenuItem value={"5.000-15.000"}>5.000-15.000</MenuItem>
              <MenuItem value={"5.000-15.000"}>5.000-15.000</MenuItem>
              <MenuItem value={"5.000-15.000"}>5.000-15.000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!isEmpty || isError}
          color="primary"
          onClick={submit}
          className={classes.disableButton}
        >
          Confirm
        </Button>
      </div>
    </Fragment>
  )
}

export default Confirm
