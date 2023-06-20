document.addEventListener("DOMContentLoaded", function () {
  const data = {
    email: "",
    cc: "",
    subject: "",
    message: "",
  };

  // Seleccionar los elementos de la interfaz:
  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const inputCc = document.querySelector("#cc");
  const form = document.querySelector("#form");
  const btnSubmit = document.querySelector('button[type="submit"]');
  const btnReset = document.querySelector('button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  // console.log(inputEmail);
  // console.log(inputSubject);
  // console.log(inputMessage);

  // Asignar eventos:

  // inputEmail.addEventListener("blur", function (e) {
  // callback: cuando suceda el evento, se ejecuta la función.
  //   console.log(e.target.value); // (e) proporciona información sobre el evento que se está registrando.
  // });
  // inputSubject.addEventListener("blur", function (e) {
  //   console.log(e.target.value);
  // });
  // inputMessage.addEventListener("blur", function (e) {
  //   console.log(e.target.value);
  // });

  // Manera más sencilla, los tres eventos llaman a la misma función; se eliminan callbacks:
  inputEmail.addEventListener("blur", validate);
  inputSubject.addEventListener("blur", validate);
  inputMessage.addEventListener("input", validate);
  inputCc.addEventListener("input", ccField);

  form.addEventListener('submit',sendData)

  btnReset.addEventListener('click', function(e){
    e.preventDefault();
    resetForm();
  })

  function sendData(e){
    e.preventDefault();
    spinner.style.visibility = 'visible';
    setTimeout(() => {
      spinner.style.visibility = 'hidden';

      resetForm();
      // Crear alerta:
      const success = document.createElement('P');
      success.classList.add('success');
      success.textContent = 'Message sent successfully 💌'
      form.appendChild(success);
      setTimeout(() => {
        success.remove();
      }, 3000);

    }, 3000);
    }

  function validate(e) {
    if (e.target.value.trim() === "") {
      // trim() para evitar los espacios en blanco
      showAlert(`💔 Required field: ${e.target.id}`, e.target.parentElement);
      data[e.target.id] = "";
      checkData();
      return; // para detener la ejecución del código
    }
    if (e.target.id === "email" && !validateMail(e.target.value)) {
      showAlert("Invalid email adress 🦄", e.target.parentElement);
      data[e.target.id] = "";
      checkData();
      return;
    }

    cleanAlert(e.target.parentElement); // e.target.parentElement para conocer qué elemento está permitiendo la validación

    // Asignar valores al objeto:
    data[e.target.id] = e.target.value.trim().toLowerCase();
    checkData();
  }

  function showAlert(content, reference) {
    cleanAlert(reference);

    // Generar alerta con HTML:
    const error = document.createElement("P");
    error.textContent = content;
    error.classList.add("alert");

    // Inyectar el mensaje de error en la página:
    reference.appendChild(error);
    //form.innerHTML = error; // [object HTMLParagraphElement], para ver el párrafo: = error.innerHTML
  }

  function cleanAlert(reference) {
    // Comprobar si ya existe una alerta:
    const alert = reference.querySelector(".alert"); // Para que no considere todo el documento: reference acota la selección
    if (alert) {
      alert.remove();
    }
  }
  // Verificar que se trata de una dirección de email:
  function validateMail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // Expresión regular que busca un patrón
    const result = regex.test(email); //retorna true o false
    return result;
  }

  function checkData() {
    // nuevo array con los valores del objeto; .includes es un array method para comprobar si existe un string vacío
    if (Object.values(data).includes("")) {
      btnSubmit.disabled = true;
    } else {
      btnSubmit.disabled = false;
    }
  }

  function resetForm() {
    data.email = '';
    data.subject = '';
    data.message = '';

    form.reset();
    checkData();
  }

  function ccField(e) {
    if (e.target.id === "cc" && !validateMail(e.target.value)) {
      showAlert("Invalid email adress 🦄", e.target.parentElement);
      data[e.target.id] = "";
      checkData();
      return;
    }
    cleanAlert(e.target.parentElement)
    data[e.target.id] = e.target.value.trim().toLowerCase();
    checkData();
  }
});
