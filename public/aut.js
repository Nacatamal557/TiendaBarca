// =========================================
// MOSTRAR / OCULTAR CONTRASEÑA
// =========================================

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", () => {

        const input =
            button.parentElement.querySelector("input");

        const icon =
            button.querySelector("i");

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });

});

// =========================================
// LOGIN
// =========================================

const loginForm = document.getElementById('loginForm');

if (loginForm) {

    loginForm.addEventListener('submit', (e) => {

        const email =
            document.getElementById('email').value;

        const password =
            document.getElementById('password').value;

        if (!email || !password) {

            e.preventDefault();

            alert('Completa todos los campos');

        }

    });

}

// =========================================
// REGISTRO
// =========================================

const registerForm =
    document.getElementById('registerForm');

if (registerForm) {

    registerForm.addEventListener('submit', (e) => {

        const password =
            document.getElementById('regPassword').value;

        const confirm =
            document.getElementById('confirmPassword').value;

        if (password !== confirm) {

            e.preventDefault();

            alert('Las contraseñas no coinciden');

        }

    });

}