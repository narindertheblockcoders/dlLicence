import * as yup from "yup";

var regularExpression =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  9;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required(),
  password: yup
    .string()
    .min(5)
    .matches(regularExpression, {
      message: "Please create a stronger password",
    })
    .required(),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required(),
  password: yup
    .string()
    .min(5)
    .matches(regularExpression, {
      message: "Please create a stronger password",
    })
    .required(),
  name: yup.string().min(2).required(),
  // city: yup.string().required(),
  // state: yup.string().required(),
  // designation: yup.string().required(),
  mobile:  yup.string()
  .required("required")
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, "to short")
  .max(10, "too long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], " password does not match."),
});

export const swapModalSchema = yup.object().shape({
  clientName: yup.string().min(2).max(25).required("Name is required"),
  clientMobileNo:  yup.string()
  .required("Mobile No. is required")
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, "Invalid mobile number"),
  // .max(10, "too long"),first
  bookingRefNo: yup.string().min(2).required("Booking Ref.No. is required"),
  locationId:yup.string().required("Location is required"),
  vehicleTypeId:yup.string().required("Vehicle type is required"),
  // changeBookingDate:yup.string().required("Booking type is required"),
});


export const addTrainerModalSchema = yup.object().shape({
  trainerid:yup.string().required("Please select trainer"),
  
});
export const swapTrainerModalSchema = yup.object().shape({

  trainerId:yup.string().required("Please select trainer"),
  
});