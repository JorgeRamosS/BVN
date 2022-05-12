let tabla = document.querySelector("#tabla-pacientes");

tabla.addEventListener("click",function(event){
    event.target.parentNode.classList.add("fadeOut");
    setTimeout(function(){
        event.target.parentNode.remove();
    },500);
});