const fleet={
prius:{name:'Toyota Prius',category:'STANDARD',price:'$699',description:'Fuel-efficient, comfortable, and ready for relaxed island driving. A practical option for exploring Honolulu, making everyday stops, and taking scenic drives around Oʻahu.',features:['Monthly rental only','5 passengers*','2 bags*','Airport-area pickup','Free airport parking*'],images:['assets/toyota-prius.jpg']},
corolla:{name:'Toyota Corolla',category:'ECONOMY',price:'$799',description:'A reliable, comfortable choice for city driving and day trips. The Corolla is a practical fit for getting around Honolulu and exploring the island at your own pace.',features:['Monthly rental only','5 passengers*','3 bags*','Easy to park','Free airport parking*'],images:['assets/toyota-corolla.jpg']},
altima:{name:'Nissan Altima',category:'FULL SIZE CAR',price:'$899',description:'A roomier sedan designed for a relaxed ride. Choose this category if you prefer extra cabin space for longer drives between Honolulu, the North Shore, and the island’s coastal viewpoints.',features:['Monthly rental only','5 passengers*','2 bags*','Roomy sedan','Free airport parking*'],images:['assets/nissan-altima.jpg']},
hrv:{name:'Honda HR-V',category:'MIDSIZE SUV',price:'$2,000',description:'A versatile SUV-style option with a higher seating position and extra room for beach gear, shopping bags, and day-trip essentials. A useful choice for travelers who want more flexibility during a monthly stay.',features:['Monthly rental only','5 passengers*','4 bags*','Extra cargo room','Free airport parking*'],images:['assets/honda-hrv.jpg']}
};
const modal=document.querySelector('#carModal'),img=document.querySelector('#modalImage'),title=document.querySelector('#modalTitle'),category=document.querySelector('#modalCategory'),description=document.querySelector('#modalDescription'),price=document.querySelector('#modalPrice'),features=document.querySelector('#modalFeatures'),dots=document.querySelector('#photoDots');let active=null,idx=0;
function showPhoto(){const c=fleet[active];img.src=c.images[0].replace(/\.jpg$/,'-modal.webp');img.alt=c.name+' representative vehicle photo';const photoPanel=img.closest('.modal-photo');if(photoPanel)photoPanel.style.setProperty('--vehicle-image',`url(\"${img.src}\")`);if(dots)dots.innerHTML=''}
function openCar(key){active=key;idx=0;const modalBody=modal.querySelector('.modal-body');if(modalBody)modalBody.scrollTop=0;modal.scrollTop=0;const c=fleet[key];title.textContent=c.name;category.textContent=c.category;description.textContent=c.description;price.textContent=c.price;features.innerHTML=c.features.map(f=>'<span>✓ '+f+'</span>').join('');showPhoto();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';const closeButton=modal.querySelector('.close-modal');if(closeButton)closeButton.focus()}
function closeCar(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('.cars-grid').addEventListener('click',e=>{const card=e.target.closest('.car-card');if(card){e.preventDefault();openCar(card.dataset.car)}});document.querySelectorAll('.car-card').forEach(card=>card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCar(card.dataset.car)}}));
document.querySelector('.close-modal').addEventListener('click',closeCar);modal.addEventListener('click',e=>{if(e.target===modal)closeCar()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCar();});
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));document.querySelector('#year').textContent=new Date().getFullYear();

// Accessible horizontal review carousel controls
const reviewTrack=document.querySelector('#reviewsTrack');
const reviewPrev=document.querySelector('.review-prev');
const reviewNext=document.querySelector('.review-next');
if(reviewTrack&&reviewPrev&&reviewNext){
 const reviewStep=()=>{const card=reviewTrack.querySelector('.review-card');return card?card.getBoundingClientRect().width+20:340};
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let autoTimer=null,resumeTimer=null;
 const advanceReviews=()=>{
   const max=reviewTrack.scrollWidth-reviewTrack.clientWidth;
   if(max<=4)return;
   if(reviewTrack.scrollLeft>=max-8)reviewTrack.scrollTo({left:0,behavior:'smooth'});
   else reviewTrack.scrollBy({left:reviewStep(),behavior:'smooth'});
 };
 const stopAuto=()=>{if(autoTimer)clearInterval(autoTimer);autoTimer=null;if(resumeTimer)clearTimeout(resumeTimer);};
 const startAuto=()=>{if(reduceMotion||autoTimer)return;autoTimer=setInterval(advanceReviews,4800)};
 const pauseThenResume=()=>{stopAuto();if(!reduceMotion)resumeTimer=setTimeout(startAuto,7000)};
 reviewPrev.addEventListener('click',()=>{reviewTrack.scrollBy({left:-reviewStep(),behavior:'smooth'});pauseThenResume()});
 reviewNext.addEventListener('click',()=>{reviewTrack.scrollBy({left:reviewStep(),behavior:'smooth'});pauseThenResume()});
 reviewTrack.addEventListener('mouseenter',stopAuto);reviewTrack.addEventListener('mouseleave',startAuto);
 reviewTrack.addEventListener('focusin',stopAuto);reviewTrack.addEventListener('focusout',startAuto);
 reviewTrack.addEventListener('touchstart',stopAuto,{passive:true});reviewTrack.addEventListener('touchend',()=>{if(!reduceMotion)resumeTimer=setTimeout(startAuto,7000)},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAuto();else startAuto()});
 startAuto();
}
