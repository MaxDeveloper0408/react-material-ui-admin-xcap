import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"
import InputMask from "react-input-mask";
// Destructure props
const SecondStep = ({
  classes,
  handleNext,
  handleBack,
  handleChange,
  values: { zipcode, birthdate, gender,investment_type,investment},
  filedError,
  isError,
  isZipcode
}) => {
  // Check if all values are not empty
  const isEmpty = birthdate.length > 0
                   && zipcode.length > 0
                   && gender.length > 0
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputMask
            mask="99999-999"
            maskChar=" "
            defaultValue={zipcode}
            onChange={handleChange("zipcode")}
          >
            {() => <TextField
                    fullWidth
                    label="CEP"
                    name="zipcode"
                    placeholder="Informe seu CEP"
                    margin="normal"
                    error={!isZipcode}
                    helperText={isZipcode ? "" : "Formato de CEP inválido."}
                    required
                  />
            }
            </InputMask>

        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Nascimento"
            name="birthdate"
            type="date"
            defaultValue={birthdate}
            onChange={handleChange("birthdate")}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="gender">Gênero</InputLabel>
            <Select value={gender} onChange={handleChange("gender")}>
              <MenuItem value={"MASCULINO"}>MASCULINO</MenuItem>
              <MenuItem value={"FEMININO"}>FEMININO</MenuItem>
              <MenuItem value={"OUTRO"}>OUTRO</MenuItem>
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
          Voltar
        </Button>
        <Button
          variant="contained"
          disabled={!isEmpty || isError || !isZipcode}
          color="primary"
          onClick={handleNext}
          className={classes.disableButton}
        >
         Avançar
        </Button>
      </div>
    </Fragment>
  )
}

export default SecondStep
