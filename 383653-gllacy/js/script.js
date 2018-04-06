(function () {
   var link = document.querySelector(".feedback-button");
   var popup = document.querySelector(".feedback-popup");
   var overlay = document.querySelector(".popup-overlay");
   var close = popup.querySelector(".close-button");
   var form = popup.querySelector("form");
   var login = popup.querySelector("[name=feedback-user-name]");
   var email = popup.querySelector("[name=feedback-user-email]");
   var text = popup.querySelector("[name=feedback-form-text]");
   var isStorageSupport = true;
   var loginStoraged = "";
   var emailStoraged = "";
  
  try {
    loginStoraged = localStorage.getItem("login");
    emailStoraged = localStorage.getItem("email");
  } catch (err) {
    isStorageSupport = false;
  }

   link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    overlay.classList.add("modal-show-overlay");

    if (loginStoraged && emailStoraged) {
      login.value = loginStoraged;
      email.value = emailStoraged;
      text.focus();
    } else if(emailStoraged && !loginStoraged){
      email.value = emailStoraged;
      login.focus();
    } else if(!emailStoraged && loginStoraged){
      login.value = loginStoraged;
      email.focus();
    }
  });

   close.addEventListener("click", function (evt) {
    popup.classList.remove("modal-show");
    overlay.classList.remove("modal-show-overlay");
    popup.classList.remove("modal-error");
  });

   form.addEventListener("submit", function (evt) {
    if (!login.value || !email.value || !text.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("login", login.value);
      }
    }
  });

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal-show")) {
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
      }
    }
  });

})();