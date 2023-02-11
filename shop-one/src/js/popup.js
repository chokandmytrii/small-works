let popup = document.querySelector(".popup");
let form = document.querySelector(".popup__form");
let alertBlock = document.querySelector(".popup__alert");
let page = document.querySelector(".page");

function findLog(event) {
    if (event.target.classList.contains("user-log") || event.target.classList.contains("user-log__svg") || event.target.classList.contains("user-log__option")) {
        popup.classList.add("popup-active");
    }
}

page.addEventListener('click', (event) => findLog(event));

popup.addEventListener('click', (event) => {
    event.target.classList.contains("popup__close") && popup.classList.remove("popup-active");
});

let mailInput = document.querySelector(".input-email");
let mailPassw = document.querySelector(".input-passw");

function testInputs() {
    if (/.([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{1,6})./.test(mailInput.value)) {
        mailInput.classList.contains("input-wrong") && mailInput.classList.remove("input-wrong");
        mailInput.classList.add("input-correct");
        if (mailPassw.value.length >= 8) {
            mailPassw.classList.contains("input-wrong") && mailPassw.classList.remove("input-wrong");
            mailPassw.classList.add("input-correct")
        } else {
            mailPassw.classList.add("input-wrong");
        }
    } else {
        mailInput.classList.add("input-wrong");
        if (mailPassw.value.length >= 8) {
            mailPassw.classList.contains("input-wrong") && mailPassw.classList.remove("input-wrong");
            mailPassw.classList.add("input-correct")
        } else {
            mailPassw.classList.add("input-wrong");
        }
    }
}

let loginBlock = document.querySelector(".popup__alert");
let joinBlock = document.querySelector(".popup__alert");

popup.addEventListener('click', (event) => {
    if (event.target.classList.contains("popup__login")) {
        event.preventDefault();
        testInputs();
        if (mailPassw.classList.contains("input-wrong") || mailInput.classList.contains("input-wrong")) {
            return;
        }
        alertBlock.classList.contains("popup__alert-join") && alertBlock.classList.remove("popup__alert-join");
        alertBlock.classList.add("popup__alert-login");
        alertBlock.textContent = "This email wasn't registered yet, join us!";
        setTimeout(() => {
            alertBlock.classList.remove("popup__alert-login");
            alertBlock.textContent = '';
        }, 2000)
    } else if (event.target.classList.contains("popup__join")) {
        event.preventDefault();
        testInputs();
        if (mailPassw.classList.contains("input-wrong") || mailInput.classList.contains("input-wrong")) {
            return;
        }
        alertBlock.classList.contains("popup__alert-login") && alertBlock.classList.remove("popup__alert-login");
        alertBlock.classList.add("popup__alert-join");
        alertBlock.textContent = "Activation message was sent to your email!";
        mailPassw.value = '';
        mailInput.value = '';
        mailInput.classList.remove("input-correct");
        mailPassw.classList.remove("input-correct");

        setTimeout(() => {
            alertBlock.classList.remove("popup__alert-join");
            alertBlock.textContent = '';
        }, 2000)
    } else {
        return
    }
});
