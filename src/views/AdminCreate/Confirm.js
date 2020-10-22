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
  values: { street, number, complement, neighborhood, city, state},
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
  const isNumber = number.length > 1 && number.length < 6;
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Logradouro"
            name="street"
            placeholder="Digite sua rua/logradouro."
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
            label="Número"
            name="number"
            placeholder="Digite o número da residência."
            defaultValue={number}
            onChange={handleChange("number")}
            margin="normal"
            error={filedError.number !== "" || !isNumber}
            helperText={filedError.number !== "" || !isNumber ? "Números de 2 a 5 necessários." : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Complemento"
            name="complement"
            placeholder="Digite um complemento. i.e: apartamento 10"
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
            label="Bairro"
            name="neighborhood"
            placeholder="Digite o bairro da residência."
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
            label="Cidade"
            name="city"
            placeholder="Digite o nome da cidade."
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
            label="Estado"
            name="state"
            placeholder="Digite o nome do estado."
            defaultValue={state}
            onChange={handleChange("state")}
            margin="normal"
            error={filedError.state !== ""}
            helperText={filedError.state !== "" ? `${filedError.state}` : ""}
            disabled
            required
          />
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
          disabled={!isEmpty || isError}
          color="primary"
          onClick={submit}
          className={classes.disableButton}
        >
          Finalizar
        </Button>
      </div>
    </Fragment>
  )
}

export default Confirm
