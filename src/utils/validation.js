const validator = require("validator");

const validateSignUpData = (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

const validateEmailData = (emailId) => {
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};

const validateEditProfileData = function (req) {
  const data = req.body;
  const allowedFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
    "gender",
    "age",
  ];
  const validEditableField = Object.keys(data).every((ele) =>
    allowedFields.includes(ele)
  );
  if (!validEditableField) {
    throw new Error("Field is not editable");
  }
  else{
    return true
  }
};
module.exports = { validateSignUpData, validateEmailData,validateEditProfileData };
