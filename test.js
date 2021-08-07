document.addEventListener("DOMContentLoaded", function(){
    let imagens = document.getElementById("itens");
    //navegação com o scroll
    
    imagens.addEventListener("wheel", event => {
      if (event.deltaY < 0) {
        event.target.scrollBy(300, 0)
      } else {
        event.target.scrollBy(-300, 0)
      }
    });
    
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    
    //lógica dos botões de navegação
    
    prev.addEventListener('click', event => {
       imagens.scrollBy(-300, 0)
    });
    
    next.addEventListener('click', event => {
     imagens.scrollBy(300, 0)
    });
      
});