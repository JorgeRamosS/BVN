let botonAdicionar = document.querySelector("#adicionar-paciente");

botonAdicionar.addEventListener("click",function(event){
    event.preventDefault();

    let form = document.querySelector("#form-adicionar");

    let paciente = capturarDatosPaciente(form);

    let errores = validarPaciente(paciente);

    if(errores.length > 0) {
        exhibirMensajesErrores(errores)
        return;
    }    

    adicionarPacienteEnLaTabla(paciente);    
    form.reset();
    
    let mensajesErrores = document.querySelector("#mensajes-errores");
    mensajesErrores.innerHTML = "";
});

function adicionarPacienteEnLaTabla(paciente){
    let pacienteTr = construirTr(paciente);
    let tabla = document.querySelector("#tabla-pacientes");    
    tabla.appendChild(pacienteTr);

}

function capturarDatosPaciente(form){
    // Capturando los datos del formulario
    let paciente = {
        nombre: form.nombre.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcularImc(form.peso.value,form.altura.value)        
    }
    return paciente;
}

function construirTr(paciente){
    let pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
        
    pacienteTr.appendChild(construirTd(paciente.nombre, "info-nombre"));
    pacienteTr.appendChild(construirTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(construirTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(construirTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(construirTd(paciente.imc, "info-imc"));
    
    return pacienteTr
}

function construirTd(dato,clase){
    let td = document.createElement("td");
    td.classList.add(clase);
    td.textContent = dato;

    return td;

}

function validarPaciente(paciente) {
    let errores = [];

    if(paciente.nombre.length == 0){
        errores.push("El Nombre no puede estar vacio");
    }
    
    if(paciente.peso.length == 0){
        errores.push("El Peso no puede estar vacio");
    }

    if(paciente.altura.length == 0){
        errores.push("La Altura no puede estar vacia");
    }

    if(paciente.gordura.length == 0){
        errores.push("La % Gordura no puede estar vacia");
    }

    if(!validarPeso(paciente.peso)){
        errores.push("El peso es Incorrecto");
    }
    
    if(!validarAltura(paciente.altura)){
        errores.push("La altura es Incorrecta");
    }

    return errores;
}

function exhibirMensajesErrores(errores) {
    let ul = document.querySelector("#mensajes-errores");
    ul.innerHTML = "";

    errores.forEach(function(error){
        let li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    })
}