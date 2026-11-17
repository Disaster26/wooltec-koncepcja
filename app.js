(function(){
function init(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    ['start','zastosowania','gradacja','produkty','dla-firm','opinie','poradnik','kontakt'].forEach(function(id){var t=document.getElementById(id);if(t)io.observe(t)});
  }
  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var down=false,sx=0,sl=0,moved=false;
    function step(){var k=tor.children[0];return k?k.getBoundingClientRect().width+parseFloat(getComputedStyle(tor).columnGap||20):300}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||tor.scrollWidth<=tor.clientWidth+2)return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;tor.classList.remove('drag');if(moved){var w=step();tor.scrollTo({left:Math.round(tor.scrollLeft/w)*w,behavior:'smooth'})}});
    tor.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('[data-nav="'+tor.id+'"]');
    function upd(){if(nav)nav.style.visibility=tor.scrollWidth>tor.clientWidth+2?'visible':'hidden'}
    if(nav)nav.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:step()*(+b.dataset.k),behavior:'smooth'})})});
    requestAnimationFrame(upd);addEventListener('resize',upd);
  });
  var lb=document.getElementById('lb'),lbi=lb.querySelector('img'),lbc=lb.querySelector('figcaption'),grp=[],ix=0,last=null,tx0=null;
  function pokaz(){var b=grp[ix];lbi.src=b.dataset.src;lbi.alt=(b.querySelector('img')||{}).alt||'';lbc.textContent=b.dataset.cap+(grp.length>1?'  ('+(ix+1)+' / '+grp.length+')':'')}
  function otworz(b){grp=[].slice.call(document.querySelectorAll('[data-lb="'+b.dataset.lb+'"]'));ix=grp.indexOf(b);last=b;pokaz();lb.classList.add('on');document.body.style.overflow='hidden';lb.querySelector('.x').focus();var m=grp.length>1;lb.querySelector('.p').hidden=!m;lb.querySelector('.n').hidden=!m}
  function zam(){lb.classList.remove('on');document.body.style.overflow='';lbi.removeAttribute('src');if(last)last.focus()}
  function kr(d){ix=(ix+d+grp.length)%grp.length;pokaz()}
  document.querySelectorAll('[data-lb]').forEach(function(b){b.addEventListener('click',function(){otworz(b)})});
  lb.querySelector('.x').addEventListener('click',zam);lb.querySelector('.p').addEventListener('click',function(){kr(-1)});lb.querySelector('.n').addEventListener('click',function(){kr(1)});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')zam()});
  lb.addEventListener('touchstart',function(e){tx0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(tx0===null)return;var d=e.changedTouches[0].clientX-tx0;if(Math.abs(d)>50&&grp.length>1)kr(d<0?1:-1);tx0=null});
  document.addEventListener('keydown',function(e){if(lb.classList.contains('on')){if(e.key==='Escape')zam();if(e.key==='ArrowRight')kr(1);if(e.key==='ArrowLeft')kr(-1)}else if(e.key==='Escape')zamknij()});
  var f=document.getElementById('form'),msg=document.getElementById('msg');
  f.addEventListener('submit',function(e){e.preventDefault();var ok=true;[].forEach.call(f.querySelectorAll('[required]'),function(i){var v=i.type==='checkbox'?(i.checked?'1':''):i.value.trim();var bad=!v;i.setAttribute('aria-invalid',bad);if(bad&&ok){ok=false;i.focus()}});if(!ok)return;msg.hidden=false;f.reset();msg.scrollIntoView({block:'nearest',behavior:'smooth'})});
  var mapa=document.getElementById('mapa');
  function mapaWczytaj(){if(mapa.querySelector('iframe'))return;var i=document.createElement('iframe');i.src=mapa.dataset.src;i.title='Mapa: Wooltec, Janów 5i, 24-100 Puławy';i.referrerPolicy='no-referrer-when-downgrade';mapa.appendChild(i)}
  document.getElementById('pokaz-mape').addEventListener('click',mapaWczytaj);
  if('IntersectionObserver' in window){var mio=new IntersectionObserver(function(es){if(es[0].isIntersecting){mapaWczytaj();mio.disconnect()}},{rootMargin:'200px'});mio.observe(mapa)}
  var lz=[].slice.call(document.querySelectorAll('img[data-src]'));
  function wczytaj(i){if(!i.dataset.src)return;if(i.dataset.srcset)i.srcset=i.dataset.srcset;i.src=i.dataset.src;i.removeAttribute('data-src')}
  if('IntersectionObserver' in window){var lio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){wczytaj(e.target);lio.unobserve(e.target)}})},{rootMargin:'400px 200px'});lz.forEach(function(i){lio.observe(i)})}else lz.forEach(wczytaj);
  document.querySelectorAll('[data-temat]').forEach(function(a){a.addEventListener('click',function(){var t=document.getElementById('temat');if(t)t.value=a.dataset.temat})});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
