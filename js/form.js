const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show Input Error Message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  formControl.querySelector("small").innerText = message;
}

//Show Input Succes Outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check Email is Valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    console.log(re);
    showSuccess(input);
  } else {
    showError(input, "Email is Not Valid");
  }
}

//Check Required
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} Is Required`);
    } else {
      showSuccess(input);
    }
  });
}

// Get FieldName
function getFieldName(input) {
  // charAt is used to access that character and slice is used to cut
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check The length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Check Password Match
function checkPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password Does Not Match");
  }
}

//Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkPassword(password, password2);
  checkEmail(email);
  if (
    username.parentElement.classList.contains("success") &&
    email.parentElement.classList.contains("success") &&
    password.parentElement.classList.contains("success") &&
    password2.parentElement.classList.contains("success")
  ) {
    window.location.href = "index.html";
  }
});
