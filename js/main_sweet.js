function mostrarAlertaConImagen() {
    Swal.fire({
        title: 'Macdonalds',
        text: 'Gracias por visitar su Macdonalds de confianza',
        imageUrl: 'images/logo.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'logo',
      })
}

function mostrarFormEnviado() {
    Swal.fire({
        position: 'right',
        icon: 'success',
        title: 'Gracias',
        text: 'Sus datos fueron enviados correctamente',
        showConfirmButton: false,
        background: '#ccc url(images/logo.png)',
        width: 400,
        padding: '4em',
        backdrop: `
        rgba(50,50,50)
        url("images/pulgar.jpg")
        right top
        no-repeat`,
        timer: 5000
    });
}

function validarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;

    if (nombre.trim() == "") {
        mostrarError("Nombre");
        return false;
    }

    if (email.trim() == "") {
        mostrarError("Email");
        return false;
    }

    Swal.fire({
        title: '¿Desea guardar sus datos personales?',
        text: "Sus datos seran guardados en nuestra base de datos",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si por favor'
      }).then((result) => {
        if (result.isConfirmed) {
            guardarDatos(nombre, email);
          Swal.fire(
            'Guardados',
            'Sus datos seran guardados en nuestra base de datos',
            'success'
          )
        }
      })
}

function mostrarError(campo) {
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Falta completar el campo: ' + campo
    })
}

function guardarDatos(nombre, email) {
    localStorage.setItem("datosFormulario", JSON.stringify({nombre:nombre, email:email}));
}

document.getElementById("boton_enviar").addEventListener("click", mostrarAlertaConImagen);
document.getElementById("boton_enviar").addEventListener("click", mostrarFormEnviado);
document.getElementById("boton_enviar").addEventListener("click", validarFormulario);