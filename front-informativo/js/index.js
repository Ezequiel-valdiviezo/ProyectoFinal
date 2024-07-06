document.getElementById("formContacto").addEventListener("submit", function(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    // console.log("Datos del formulario:");

    const options = {
        method: "POST",
        body: formData,
    };

    console.log("Enviando el formulario...");

    fetch('http://127.0.0.1:8000/api/consulta', options)
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor: ", data);
    })
    .catch(error => {
        console.log("Error al enviar el formulario", error);
    });
});