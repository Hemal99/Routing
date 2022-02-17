import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
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
  },
  padding: {
    padding: theme.spacing(3),
  },
}));

let initialValues = {
  email: "",
  password: "",
};

let SignUpSchema = Yup.object().shape({
  email: Yup.string().required("Email is required!"),
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
      const data = await axios.post("/auth/login/", {
        email: e.email,
        password: e.password,
      });

      const { fullName, role, accessToken, permittedRoutes, id, ownerName } =
        data.data;
      props.login(fullName, role, accessToken, permittedRoutes, id, ownerName);

      navigate("/dashboard");

     
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
              <Card className={classes.padding} variant="outlined">
                <CardHeader
                  title="Welcome back!"
                  className={classes.center}
                ></CardHeader>

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
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!dirty || !isValid}
                            type="submit"
                          >
                            login
                          </Button>
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
