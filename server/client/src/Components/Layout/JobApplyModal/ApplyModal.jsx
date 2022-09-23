import { Button, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./applymodal.style.css";

const textbox = {
  width: "100%",
  border: "1px solid black",
};
export const ApplyModal = ({ open, handleClose, jobId, handleApply }) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      resume: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(8).required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone No. is required")
    }),
    onSubmit: (values) => {
      handleApply();
    },
  });
  return (
    <div
      style={{
        display: "flex",
        width:"100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Modal
        style={{
          width:"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="applyForm">
          <form onSubmit={formik.handleSubmit}>
            <Grid container style={{ width: "100%", margin: "10px" }}>
              <TextField
                color="primary"
                focused
                type="text"
                label="Name*"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid container style={{ width: "100%", margin: "10px" }}>
              <TextField
                color="primary"
                focused
                type="text"
                label="Email *"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid container style={{ width: "100%", margin: "10px" }}>
              <TextField
                color="primary"
                focused
                type="text"
                label="Phone *"
                name="phone"
                className="expand"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </form>

          <Button variant="outlined" onClick={handleClose}>
            cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};
