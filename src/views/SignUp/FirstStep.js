import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import InputMask from "react-input-mask";
// Destructure props
const FirstStep = ({
  classes,
  handleNext,
  handleChange,
  values: { full_name, cpf, email, cellphone, password, confirm },
  filedError,
  isError
}) => {
  // Check if all values are not empty
  const isEmpty = full_name.length > 0
                  && cpf.length > 0
                  && email.length > 0
                  && cellphone.length > 0
                  && password.length > 0
                  && confirm.length > 0
                  && password === confirm
  if(confirm !== password) {
      filedError.confirm = 'Confirmar Senha e Senha devem ser iguais.';
  }
  return (
    <Fragment>
      <Grid container noValidate>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome Completo"
            name="full_name"
            placeholder="Nome Completo"
            defaultValue={full_name}
            onChange={handleChange("full_name")}
            margin="normal"
            error={filedError.full_name !== ""}
            helperText={
              filedError.full_name !== "" ? `${filedError.full_name}` : ""
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputMask
            mask="999.999.999-99"
            maskChar=" "
            defaultValue={cpf}
            onChange={handleChange("cpf")}
          >
            {() => <TextField
                    fullWidth
                    label="CPF"
                    name="cpf"
                    placeholder="format: 532.820.857-96"
                    margin="normal"
                    error={filedError.cpf !== ""}
                    helperText={
                      filedError.cpf !== "" ? `${filedError.cpf}` : ""
                    }
                    required
                  />
            }
            </InputMask>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            placeholder="meu@email.com.br"
            type="email"
            defaultValue={email}
            onChange={handleChange("email")}
            margin="normal"
            error={filedError.email !== ""}
            helperText={filedError.email !== "" ? `${filedError.email}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <InputMask
              mask="+55 (99) 99999-9999"
              maskChar=" "
              defaultValue={cellphone}
              onChange={handleChange("cellphone")}
            >
              {() => <TextField
                      fullWidth
                      label="Celular"
                      name="cellphone"
                      placeholder="i.e: +55 (99) 99999-9999"
                      margin="normal"
                      error={filedError.cellphone !== ""}
                      helperText={filedError.cellphone !== "" ? `${filedError.cellphone}` : ""}
              />}
          </InputMask>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Senha"
            name="password"
            type="password"
            placeholder="Senha"
            defaultValue={password}
            onChange={handleChange("password")}
            margin="normal"
            error={filedError.password !== ""}
            helperText={
              filedError.password !== "" ? `${filedError.password}` : ""
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirmar Senha"
            name="confirm"
            type="password"
            placeholder="Confirmar Senha"
            defaultValue={confirm}
            onChange={handleChange("confirm")}
            margin="normal"
            error={filedError.confirm !== ""}
            helperText={
              filedError.confirm !== "" ? `${filedError.confirm}` : ""
            }
            required
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          disabled={!isEmpty || isError}
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

export default FirstStep
