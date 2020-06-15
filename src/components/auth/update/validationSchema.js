import * as Yup from "yup";

export default Yup.object().shape({
  code: Yup.string().required("Please provide reset password code"),
  newPassword: Yup.string()
    .required("Please provide password")
    .min(8, "Minimum password length is 8"),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must much")
    .required("Password confirmation is required"),
});
