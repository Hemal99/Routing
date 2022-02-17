import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../store/actions/authActions";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import axios from "../../utils/lib/axios";
import styles from "../../utils/styles/Login.module.css";
import { useNavigate } from "react-router-dom";

// validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// import FormikField from "../formikField/FormikField";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    height: "100%",
  },
  center: {
    textAlign: "center",
    color: "#35BFFF",
    fontSize: "2em",
    fontWeight: 100,
    lineHeight: "1em",
    marginTop: 0,
    fontFamily: '"Lato",sans-serif',
  },
  padding: {
    padding: theme.spacing(3),
  },

  button: {
    backgroundColor: "#2cca5c",
    color: "white",
    "&hover": {
      backgroundColor: "#2cca5c",
      color: "white",
    },
  },
}));

let initialValues = {
  email: "",
  password: "",
};

let SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});
function Login(props) {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    showAlert: false,
    severity: "success",
    message: "",
  });
  let navigate = useNavigate();

  const submit = async (e) => {
    try {
      const data = await axios.post("/auth/customer-login/", {
        email: e.email,
        password: e.password,
      });

      const { accessToken, id } = data.data;
      props.login(accessToken, id);

      navigate("/myacount");
    } catch (error) {
      if (error.response.status === 401) {
        setAlert({
          showAlert: true,
          severity: "error",
          message: "Unauthorized!",
        });
      } else if (error.response.status === 501) {
        setAlert({
          showAlert: true,
          severity: "error",
          message:
            "You are temporary block. Please contact your administrator!",
        });
      } else {
        setAlert({
          showAlert: true,
          severity: "error",
          message: "Server error!",
        });
      }
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
      spacing={1}
    >
      <div className={styles.Wrapper}>
        {/* <div className={styles.Left}>
          <div id={styles.Img_Pane}>
            <img className={classes.img} src={photo} alt='Login' />
          </div>
        </div> */}
        <div className={styles.Right}>
          <div className={styles.Login}>
            <Grid item md={12}>
              <Card
                className={classes.padding}
                variant="outlined"
                style={{ width: "100%" }}
              >
                <Typography
                  className={classes.center}
                  // style={{ fontSize: "2em" }}
                >
                  Login to Your Account
                </Typography>

                <Formik
                  initialValues={initialValues}
                  onSubmit={submit}
                  validationSchema={SignUpSchema}
                >
                  {({ dirty, isValid }) => {
                    return (
                      <Form>
                        <CardContent>
                          <Field
                            name="email"
                            label="Email"
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                          ></Field>

                          <Field
                            name="password"
                            label="Password"
                            component={TextField}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            type="password"
                          ></Field>
                        </CardContent>
                        <CardActions>
                          <Grid container justifyContent="center">
                            <Grid item>
                              <Button
                                variant="contained"
                                className={classes.button}
                                disabled={!dirty || !isValid}
                                type="submit"
                              >
                                login
                              </Button>
                            </Grid>
                          </Grid>
                        </CardActions>
                      </Form>
                    );
                  }}
                </Formik>
              </Card>
            </Grid>
            {alert.showAlert && (
              <Grid item md={12}>
                <Alert
                  severity={alert.severity}
                  onClose={() =>
                    setAlert({
                      ...alert,
                      showAlert: false,
                    })
                  }
                >
                  {alert.message}
                </Alert>
              </Grid>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default connect(null, { login })(Login);
