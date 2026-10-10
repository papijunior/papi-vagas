(function(){
var busca=document.getElementById('busca');if(!busca)return;
var area=document.getElementById('area');
var cards=[].slice.call(document.querySelectorAll('.vaga')),ads=[].slice.call(document.querySelectorAll('#lista .anuncio'));
var cont=document.getElementById('contagem'),vazio=document.getElementById('vazio');
function dobra(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function filtrar(){
  var termos=dobra(busca.value).split(/\s+/).filter(Boolean),a=area?area.value:'',n=0;
  cards.forEach(function(c){
    var ok=(!a||(' '+c.dataset.areas+' ').indexOf(' '+a+' ')>=0)&&termos.every(function(t){return c.dataset.texto.indexOf(t)>=0;});
    c.hidden=!ok;if(ok)n++;
  });
  var filtrado=termos.length||a;ads.forEach(function(x){x.hidden=!!filtrado;});
  cont.textContent=filtrado?n+' vaga(s) com esse filtro':'';vazio.hidden=n>0;
}
[busca,area].forEach(function(el){if(el)el.addEventListener('input',filtrar);});
document.addEventListener('click',function(ev){
  var a=ev.target.closest('[data-evento]');
  if(a&&window.gtag){gtag('event',a.dataset.evento,{link_url:a.href});}
});
})();
