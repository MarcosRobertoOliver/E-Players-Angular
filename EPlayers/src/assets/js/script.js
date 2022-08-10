// uso do jQuery
$(document).ready(function () {
    $(".btn-buy").click(function(){
        alert("Este produto não está disponível");
    });

});


function abreFechaMenu() {
    
    let navbar = document.querySelector(".menu");
    navbar.classList.toggle("mostraEscondeMenu");
    
}


