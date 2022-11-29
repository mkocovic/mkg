const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// Remove after selecting page

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // Removing menu after selecting a page
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Skills

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

// Qualification

const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

// Scroll to top

const section = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  section.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Change bcg

function scrollHeader() {
  const nav = document.getElementById("header");
  // when scroll is greater than 200 viewport, add the scroll-header class
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// Theme switch

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Need this
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// we validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activate
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // we save the theme add the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Listen for form submit

// document.getElementById("contact__form").addEventListener("submit", submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   // Get values

//   const name = document.getElementById("contact__name").value;
//   const mail = document.getElementById("contact__mail").value;
//   const project = document.getElementById("contact__project").value;
//   const message = document.getElementById("contact__message").value;

//   saveMessage(name, mail, project, message);
// }
// // Take form values
// function getInputVal(id) {
//   return document.getElementById(id).value;
// }
// Form valdation

// // Listen for form submit & Get values

// const form = document.querySelector("#contact__form");

// form.addEventListener("submit", (e) => submitForm(e));

// /**
//  * Get values from the form and submits the data
//  * @param {Object} e - Submit event object
//  */
// const submitForm = (e) => {
//   e.preventDefault();
//   const formData = new FormData(form);
//   formData.forEach((val) => {
//     console.log(val);
//   });
// };

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCDmPt4itJQZdil_5yR-xpPcYKUt2VYQfs",

  authDomain: "contact-e62c1.firebaseapp.com",

  databaseURL: "https://contact-e62c1-default-rtdb.firebaseio.com",

  projectId: "contact-e62c1",

  storageBucket: "contact-e62c1.appspot.com",

  messagingSenderId: "632197258968",

  appId: "1:632197258968:web:56970998613194df7f01ad",
};

firebase.initializeApp(firebaseConfig);

const contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contact__form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("contact__name");
  var mail = getElementVal("contact__mail");
  var project = getElementVal("contact__project");
  var message = getElementVal("contact__message");

  saveMessage(name, mail, project, message);

  // Reset form
  document.getElementById("contact__form").reset();
}

const saveMessage = (name, mail, project, message) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    mail: mail,
    project: project,
    message: message,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
