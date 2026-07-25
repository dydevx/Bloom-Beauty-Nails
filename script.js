const header = document.querySelector('.site-header');
const sentinel = document.querySelector('.header-sentinel');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

new IntersectionObserver(([entry]) => header.classList.toggle('solid', !entry.isIntersecting)).observe(sentinel);
function closeMenu(){ mobileMenu.classList.remove('open'); document.body.classList.remove('menu-open'); menuButton.setAttribute('aria-expanded','false'); mobileMenu.setAttribute('aria-hidden','true'); }
menuButton.addEventListener('click',()=>{ const open=!mobileMenu.classList.contains('open'); mobileMenu.classList.toggle('open',open); document.body.classList.toggle('menu-open',open); menuButton.setAttribute('aria-expanded',String(open)); mobileMenu.setAttribute('aria-hidden',String(!open)); });
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{ if(event.key==='Escape'){ closeMenu(); if(lightbox.open) lightbox.close(); }});

document.documentElement.classList.add('motion-ready');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add(entry.target.classList.contains('reveal')?'is-visible':'in-view');revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal,.motion-watch').forEach(el=>revealObserver.observe(el));

const schedules=[['09:00','19:00'],['09:00','19:00'],['09:00','19:00'],['09:00','19:00'],['09:00','19:00'],['09:30','18:00'],null];
function updateHours(){const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts().filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));const day=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(parts.weekday);document.querySelectorAll('.hours-list>div').forEach((row,i)=>row.classList.toggle('today',i===day));const status=document.querySelector('.status');const schedule=schedules[day];const now=`${parts.hour}:${parts.minute}`;let label='Heute geschlossen',open=false;if(schedule&&now<schedule[0])label=`Öffnet um ${schedule[0]} Uhr`;else if(schedule&&now<schedule[1]){label='Jetzt geöffnet';open=true;}status.textContent=label;status.classList.toggle('is-open',open);}
updateHours();setInterval(updateHours,60000);

const gallery=document.querySelector('.gallery-grid');
const shuffledItems=[...gallery.querySelectorAll('.gallery-item')];
for(let i=shuffledItems.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffledItems[i],shuffledItems[j]]=[shuffledItems[j],shuffledItems[i]];}
shuffledItems.forEach((item,index)=>{item.style.setProperty('--i',index);gallery.append(item);});

const lightbox=document.querySelector('.lightbox');const items=[...gallery.querySelectorAll('.gallery-item')];let active=0;
function showImage(index){active=(index+items.length)%items.length;const source=items[active].querySelector('img');lightbox.querySelector('img').src=source.src;lightbox.querySelector('img').alt=source.alt;lightbox.querySelector('figcaption span').textContent=source.alt;lightbox.querySelector('figcaption b').textContent=`${active+1} / ${items.length}`;if(!lightbox.open)lightbox.showModal();}
items.forEach((item,index)=>item.addEventListener('click',()=>showImage(index)));
lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(active-1));lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showImage(active+1));
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});
document.addEventListener('keydown',event=>{if(!lightbox.open)return;if(event.key==='ArrowLeft')showImage(active-1);if(event.key==='ArrowRight')showImage(active+1);});
let touchX=0;lightbox.addEventListener('touchstart',event=>touchX=event.touches[0].clientX,{passive:true});lightbox.addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchX;if(Math.abs(delta)>50)showImage(active+(delta<0?1:-1));},{passive:true});

const studioVideos=[...document.querySelectorAll('.studio-videos video')];
studioVideos.forEach(video=>video.addEventListener('play',()=>studioVideos.forEach(other=>{if(other!==video)other.pause();})));
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelector('.hero-media video')?.pause();
