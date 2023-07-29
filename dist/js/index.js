//class map
const classes = {
  featureButton: ".features__button",
  featureButtonActive: "features__button--active",
  featureHeading: ".feature__heading",
  featureBody: ".feature__description",
  featureImage: ".feature__graphic",
  form: ".contact__form",
  formSubmitted: "contact__form--submitted",
  input: ".contact__input",
  inputError: "contact__input--error",
  faqButton: ".faq__button",
  faqItemOpen: "faq__item--open",
  mobileNavOpen: ".mobile__open",
  mobileNavClose: ".mobile__close",
  mobileNavOverlay: ".mobile__overlay",
  mobileNavVisible: "mobile__overlay--visible",
};

//list of features
const features = [
  {
    title: "Bookmark in one click",
    body: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favorite sites.",
    imageUrl: "assets/images/illustration-features-tab-1.svg",
  },
  {
    title: "Intelligent Search",
    body: "Our powerful search feature will help you find saved sites in no time at all. No need to tawl through all of your bookmarks.",
    imageUrl: "assets/images/illustration-features-tab-2.svg",
  },
  {
    title: "Share your bookmarks",
    body: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
    imageUrl: "assets/images/illustration-features-tab-3.svg",
  },
];

//feature elements
const featureButtons = document.querySelectorAll(classes.featureButton);
const featureHeading = document.querySelector(classes.featureHeading);
const featureBody = document.querySelector(classes.featureBody);
const featureImage = document.querySelector(classes.featureImage);

//form elements
const formElement = document.querySelector(classes.form);
const formInputElement = document.querySelector(classes.input);
const faqButtons = Array.from(document.querySelectorAll(classes.faqButton));

//mobile nav elements
const mobileNavOpen = document.querySelector(classes.mobileNavOpen);
const mobileNavClose = document.querySelector(classes.mobileNavClose);
const mobileNavOverlay = document.querySelector(classes.mobileNavOverlay);

//email validator
function isValidEmail(email) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email.match(emailRegex);
}

//display controller
const display = (function () {
  //active feature state
  let activeFeatureIndex = 0;

  function showInputError() {
    formInputElement.classList.add(classes.inputError);
  }

  function removeInputError() {
    formInputElement.classList.remove(classes.inputError);
  }

  function showFormSuccess() {
    formElement.classList.add(classes.formSubmitted);
  }

  function updateFeature(index) {
    //dont run if the feature is already active
    if (index === activeFeatureIndex) return;

    const currentFeature = features[index];

    //remove active state from current feature, add it to new feature, and update current active state
    featureButtons[activeFeatureIndex].classList.remove(classes.featureButtonActive);
    featureButtons[index].classList.add(classes.featureButtonActive);
    activeFeatureIndex = index;

    //update feature details in dom
    featureHeading.textContent = currentFeature.title;
    featureBody.textContent = currentFeature.body;
    featureImage.src = currentFeature.imageUrl;
  }

  function toggleMobileNav() {
    mobileNavOverlay.classList.toggle(classes.mobileNavVisible);
  }

  return { showInputError, removeInputError, showFormSuccess, updateFeature, toggleMobileNav };
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

//toggles faq accordions open and closed
faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle(classes.faqItemOpen);
  });
});

//hooks up the feature tabs
featureButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    display.updateFeature(i);
  });
});

//hook up mobile nav buttons
mobileNavOpen.addEventListener("click", display.toggleMobileNav);
mobileNavClose.addEventListener("click", display.toggleMobileNav);
