const previousButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const submitButton = document.querySelector('#submit');
const tabTargets = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tabpanel');
const isEmpty = (str) => !str.trim().length;
let currentStep = 0;

function validateEntry() {
  let input = tabPanels[currentStep].querySelector('.form-input');
  nextButton.setAttribute('disabled', true);
  submitButton.setAttribute('disabled', true);
  setButtonPermissions(input);
  input.addEventListener('input', () => setButtonPermissions(input));
  input.addEventListener('blur', () => setButtonPermissions(input));
}

function setButtonPermissions(input) {
  if (isEmpty(input.value)) {
    nextButton.setAttribute('disabled', true);
    submitButton.setAttribute('disabled', true);
  } else {
    nextButton.removeAttribute('disabled');
    submitButton.removeAttribute('disabled');
  }
}

function updateStatusDisplay() {
  if (currentStep === tabTargets.length - 1) {
    nextButton.classList.add('hidden');
    previousButton.classList.remove('hidden');
    submitButton.classList.remove('hidden');
    validateEntry();
  } else if (currentStep === 0) {
    nextButton.classList.remove('hidden');
    previousButton.classList.add('hidden');
    submitButton.classList.add('hidden');
  } else {
    nextButton.classList.remove('hidden');
    previousButton.classList.remove('hidden');
    submitButton.classList.add('hidden');
  }
}

nextButton.addEventListener('click', (event) => {
  event.preventDefault();
  tabPanels[currentStep].classList.add('hidden');
  tabTargets[currentStep].classList.remove('active');
  tabPanels[currentStep + 1].classList.remove('hidden');
  tabTargets[currentStep + 1].classList.add('active');
  currentStep += 1;
  validateEntry();
  updateStatusDisplay();
});

previousButton.addEventListener('click', (event) => {
  event.preventDefault();
  tabPanels[currentStep].classList.add('hidden');
  tabTargets[currentStep].classList.remove('active');
  tabPanels[currentStep - 1].classList.remove('hidden');
  tabTargets[currentStep - 1].classList.add('active');
  currentStep -= 1;
  nextButton.removeAttribute('disabled');
  updateStatusDisplay();
});

const squares = document.querySelectorAll(".square");

squares.forEach(square => {
  square.addEventListener("click", function() {
    squares.forEach(square => square.classList.remove("stayed"));

    this.classList.add("stayed");
    nextButton.removeAttribute('disabled');
  });
});

