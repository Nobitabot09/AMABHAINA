'use strict';
const $=id=>document.getElementById(id);
const categories=[['All','ॐ'],['Griha Pravesh','⌂'],['Marriage','♡'],['Satyanarayan','◉'],['Havan','♨'],['Bratopanayan','◎'],['Shraddha','◇']];
const pandits=[
{name:'Acharya S. Mishra',city:'Bhubaneswar',local:'Old Town',years:18,price:1500,services:['Griha Pravesh','Marriage','Havan'],languages:'Odia · Sanskrit · Hindi'},
{name:'Pandit R. Dash',city:'Cuttack',local:'Buxi Bazaar',years:12,price:1000,services:['Satyanarayan','Bratopanayan','Havan'],languages:'Odia · Sanskrit'},
{name:'Acharya P. Sharma',city:'Puri',local:'Grand Road',years:22,price:2000,services:['Havan','Shraddha','Marriage'],languages:'Odia · Hindi · Sanskrit'},
{name:'Pandit A. Panda',city:'Bhubaneswar',local:'Patia',years:8,price:800,services:['Satyanarayan','Griha Pravesh'],languages:'Odia · Hindi'},
{name:'Pandit B. Tripathy',city:'Puri',local:'Bali Sahi',years:16,price:1200,services:['Shraddha','Satyanarayan'],languages:'Odia · Sanskrit'},
{name:'Acharya M. Rath',city:'Cuttack',local:'Chandini Chowk',years:20,price:1800,services:['Marriage','Bratopanayan','Griha Pravesh'],languages:'Odia · Sanskrit · Hindi'}];
let selected='All';const bookings=[];
const money=n=>'₹'+n.toLocaleString('en-IN');
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 $('categories').innerHTML=categories.map(([name,icon])=>'<button class="cat" data-category="'+name+'" aria-pressed="'+(selected===name)+'"><span aria-hidden="true">'+icon+'</span>'+name+'</button>').join('');
 const q=$('query').value.trim().toLowerCase(),city=$('city').value;
 let results=pandits.map((p,i)=>({...p,i})).filter(p=>(!city||p.city===city)&&(selected==='All'||p.services.includes(selected))&&[p.name,p.city,p.local,p.languages,...p.services].join(' ').toLowerCase().includes(q));
 if($('sort').value==='price')results.sort((a,b)=>a.price-b.price);
 if($('sort').value==='experience')results.sort((a,b)=>b.years-a.years);
 $('count').textContent=results.length+' sample profiles';
 $('profiles').innerHTML=results.map(p=>'<article class="profile"><div class="phead"><div class="avatar" aria-hidden="true">ॐ</div><div><h3>'+p.name+'</h3><p class="muted">'+p.local+', '+p.city+'</p><p>'+p.years+' years of experience · Sample</p></div></div><p class="muted">'+p.languages+'</p><div class="tags">'+p.services.map(s=>'<span class="tag">'+s+'</span>').join('')+'</div><div class="price-row"><div><small>Starting from</small><strong>'+money(p.price)+'</strong></div><button class="primary" data-profile="'+p.i+'">View profile</button></div></article>').join('')||'<p>No sample profiles match. Try a different city or ceremony.</p>';
}
function show(content){$('modal-content').innerHTML=content;if(!$('modal').open)$('modal').showModal();}
function profile(i){const p=pandits[i];show('<h2 id="modal-title">'+p.name+'</h2><p>'+p.city+' · '+p.years+' years experience (sample)</p><p>'+p.languages+'</p><h3>Services</h3>'+p.services.map((s,j)=>'<div class="service-row"><span>'+s+'</span><b>'+money(p.price+j*500)+'</b></div>').join('')+'<p class="demo">Fictional profile. Travel and materials would be agreed before confirmation.</p><button class="primary" data-book="'+i+'">Request demo booking</button>');}
function book(i){const p=pandits[i];const now=new Date();const min=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');show('<h2 id="modal-title">Request a booking</h2><p>'+p.name+' · '+p.city+'</p><form id="booking-form" class="modal-form"><label>Service<select name="service">'+p.services.map(s=>'<option>'+s+'</option>').join('')+'</select></label><label>Preferred date<input name="date" type="date" min="'+min+'" required></label><label>Preferred time<input name="time" type="time" required></label><p class="demo">Simulation only. No payment or personal details required.</p><button class="primary">Submit demo request</button></form>');$('booking-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);bookings.push({name:p.name,service:f.get('service'),date:f.get('date'),time:f.get('time')});show('<h2 id="modal-title">Demo request created</h2><p>Your simulated request is pending confirmation. No real pandit has been contacted.</p><button class="primary" id="show-history">View my bookings</button>');$('show-history').addEventListener('click',history);});}
function history(){show('<h2 id="modal-title">My bookings</h2><p class="demo">Session-only demo history.</p>'+ (bookings.map(b=>'<article class="booking"><b>'+escapeHtml(b.service)+'</b><p>'+escapeHtml(b.name)+'</p><p>'+escapeHtml(b.date)+' · '+escapeHtml(b.time)+'</p><span class="tag">Pending confirmation</span></article>').join('')||'<p>No demo requests yet.</p>'));}
function join(){show('<h2 id="modal-title">Join the AmaBhaina network</h2><p>Future partner onboarding will include service areas, languages, experience, ritual expertise and manual verification.</p><p class="demo">Registration is not live yet. No personal information is collected by this preview.</p>');}
$('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){selected=b.dataset.category;render();}});
$('profiles').addEventListener('click',e=>{const b=e.target.closest('[data-profile]');if(b)profile(Number(b.dataset.profile));});
$('modal-content').addEventListener('click',e=>{const b=e.target.closest('[data-book]');if(b)book(Number(b.dataset.book));});
['city','sort'].forEach(id=>$(id).addEventListener('change',render));$('query').addEventListener('input',render);$('find').addEventListener('click',()=>{$('pandits').scrollIntoView();});$('close').addEventListener('click',()=>$('modal').close());$('history').addEventListener('click',history);$('join').addEventListener('click',join);$('partner').addEventListener('click',join);render();
