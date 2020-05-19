import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

// Destructure props
const FirstStep = ({
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
      filedError.confirm = 'Confirm password must like password';
  }
  return (
    <Fragment>
      <Grid container noValidate>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="full_name"
            placeholder="Your Full Name"
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
          <TextField
            fullWidth
            label="CPF"
            name="cpf"
            placeholder="format: 532.820.857-96"
            defaultValue={cpf}
            onChange={handleChange("cpf")}
            margin="normal"
            error={filedError.cpf !== ""}
            helperText={
              filedError.cpf !== "" ? `${filedError.cpf}` : ""
            }
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Your email address"
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
          <TextField
            fullWidth
            label="Phone number"
            name="cellphone"
            placeholder="i.e: +55 (99) 9999-9999"
            defaultValue={cellphone}
            onChange={handleChange("cellphone")}
            margin="normal"
            error={filedError.cellphone !== ""}
            helperText={filedError.cellphone !== "" ? `${filedError.cellphone}` : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
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
            label="Confirm Password"
            name="confirm"
            type="password"
            placeholder="Your confirm"
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
        >
          Next
        </Button>
      </div>
    </Fragment>
  )
}

export default FirstStep
