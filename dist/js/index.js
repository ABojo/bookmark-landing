const classes = {
  form: ".contact__form",
  formSubmitted: "contact__form--submitted",
  input: ".contact__input",
  inputError: "contact__input--error",
  faqButton: ".faq__button",
  faqItemOpen: "faq__item--open",
};

//elements
const formElement = document.querySelector(classes.form);
const formInputElement = document.querySelector(classes.input);
const faqButtons = Array.from(document.querySelectorAll(classes.faqButton));

function isValidEmail(email) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email.match(emailRegex);
}

//display controller
const display = (function () {
  function showInputError() {
    formInputElement.classList.add(classes.inputError);
  }

  function removeInputError() {
    formInputElement.classList.remove(classes.inputError);
  }

  function showFormSuccess() {
    formElement.classList.add(classes.formSubmitted);
  }

  return { showInputError, removeInputError, showFormSuccess };
})();

//listener to display errors or success state
formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formElement);
  const email = formData.get("email");

  if (isValidEmail(email)) {
    display.showFormSuccess();
  } else {
    display.showInputError();
  }
});

//clear errors after new input
formInputElement.addEventListener("input", () => {
  display.removeInputError();
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle(classes.faqItemOpen);
  });
});
