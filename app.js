const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
$$('.reveal').forEach(el=>{const text=el.innerHTML.replace(/<br\s*\/?>(\s*)/gi,' ').replace(/<[^>]*>/g,'');const words=text.trim().split(/\s+/);el.setAttribute('aria-label',text);el.innerHTML=words.map(w=>`<span class="word" aria-hidden="true">${w}</span>`).join(' ')});
let ticking=false;
function render(){ticking=false;const vh=innerHeight;
 if(!reduced.matches){
 const cred=$('.credentials'),p=clamp(-cred.getBoundingClientRect().top/Math.max(1,cred.offsetHeight-vh));
 const rail=$('.horizontal-rail');rail.style.transform=`translate3d(${-p*Math.max(0,rail.scrollWidth-document.documentElement.clientWidth)}px,0,0)`;$('.progress span').style.width=`${p*100}%`;
 const about=$('.partnership'),a=clamp(-about.getBoundingClientRect().top/Math.max(1,about.offsetHeight-vh));
 const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
 const small=innerWidth<701;
 const intro=smooth(a/.1),appear=smooth((a-.1)/.1),turn=smooth((a-.23)/.20),fill=smooth((a-.44)/.08),show=smooth((a-.51)/.07),birth=smooth((a-.67)/.08),clear=smooth((a-.73)/.06),grow=smooth((a-.79)/.14),copy=smooth((a-.93)/.05);
 const targetSize=Math.min(small?innerWidth*.45:340,vh*.40);
 const entrySize=Math.max(vh*.95,Math.min(innerWidth*.85,1100));
 const size=entrySize+(targetSize-entrySize)*turn,distance=size*(.53-.13*turn),angle=turn*Math.PI/2;
 const x=Math.sin(angle)*distance,y=Math.cos(angle)*distance;
 $('.partner-pin').style.setProperty('--orb-size',`${size}px`);
 $('.partner-title').style.opacity=intro*(1-clear);
 const title=$('.partner-title'),titleScale=1-intro*.48,groupGap=small?28:48;
 const titleHeight=title.offsetHeight*titleScale;
 title.style.top='50%';
 title.style.transform=`translateY(calc(-50% - ${turn*(targetSize+groupGap)/2}px)) scale(${titleScale})`;
 $('.orbits').style.top=`calc(50% + ${turn*(1-birth)*(titleHeight+groupGap)/2}px)`;
 $('.partner-title span').style.color=`rgb(${Math.round(187-162*intro)},${Math.round(187-162*intro)},${Math.round(187-162*intro)})`;
 $$('.orb').forEach((el,i)=>{const sign=i?1:-1;el.style.opacity=appear*(1-clear);el.style.left='50%';el.style.transform=`translate(-50%,-50%) translate(${sign*x}px,${sign*y}px)`;el.style.borderColor=`rgba(30,30,30,${.3+fill*.7})`});
 $('.orb-one').style.backgroundColor=`rgba(255,255,255,${fill})`;$('.orb-two').style.backgroundColor=`rgba(20,20,20,${fill})`;
 $$('.orb-content').forEach(el=>{el.style.opacity=show;el.style.transform='none'});
 $('.parent-overlap').style.opacity=fill*(1-clear);
 const base=small?110:150,full=Math.hypot(innerWidth,vh)*1.04;
 $('.venture-disc').style.width=`${base+(full-base)*grow}px`;
 $('.venture-disc').style.opacity=birth;
 $('.venture-disc').style.transform=`translate(-50%,-50%) scale(${.08+.92*birth})`;
 $('.venture-wordmark').style.opacity=birth;
 const wordmark=$('.venture-wordmark'),result=$('.partner-result'),gap=small?24:32;
 wordmark.style.transform=`translate(-50%,calc(-50% - ${copy*(result.offsetHeight+gap)/2}px))`;
 result.style.opacity=copy;result.style.transform=`translateY(${(wordmark.offsetHeight+gap-result.offsetHeight)/2+(1-copy)*25}px)`;
 $('.partner-hint').style.opacity=1-smooth(a/.16);
 $$('.reveal').forEach(el=>{const r=el.getBoundingClientRect(),progress=clamp((vh*.85-r.top)/(vh*.48));const words=[...el.querySelectorAll('.word')];words.forEach((w,i)=>{const k=clamp(progress*words.length-i);const col=Math.round(187-(187-25)*k);w.style.color=`rgb(${col},${col},${col})`})});
 }
}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(render);ticking=true}},{passive:true});addEventListener('resize',render);reduced.addEventListener('change',render);render();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('in-view',e.isIntersecting)),{threshold:.15});$$('.service-image').forEach(el=>observer.observe(el));
function closeMenu(){$('#more-menu').hidden=true;$('.mobile-menu').setAttribute('aria-expanded','false')}
$('.mobile-menu').onclick=()=>{const open=$('#more-menu').hidden;$('#more-menu').hidden=!open;$('.mobile-menu').setAttribute('aria-expanded',String(open))};$$('#more-menu a,#more-menu button').forEach(a=>a.addEventListener('click',closeMenu));
$$('[data-filter]').forEach(btn=>btn.onclick=()=>{$$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});$$('.project').forEach(p=>p.hidden=btn.dataset.filter!=='all'&&p.dataset.sector!==btn.dataset.filter)});
if($('#pause-motion')) $('#pause-motion').onclick=()=>{const paused=$('.marquee').classList.toggle('paused');$('#pause-motion').textContent=paused?'Resume motion ▶':'Pause motion Ⅱ';$('#pause-motion').setAttribute('aria-pressed',paused)};
const panels={resources:{title:'Resources & infrastructure',body:'<p>The joint venture brings together Kilburn’s engineering and manufacturing experience and East End’s site execution resources.</p><div class="dialog-facts"><div><small>EAST END WORKS</small>Choudwar Industrial Estate, Cuttack</div><div><small>MECHANICAL ENGINEERS</small>35</div><div><small>DIRECT STAFF</small>106</div><div><small>WORKMEN</small>Over 350</div></div><p>These figures describe East End parent operations in the supplied concept note. Project-specific deployment and the current plant, crane, welding and NDT inventory require confirmation.</p>'},qhse:{title:'Quality, health, safety & environment',body:'<p>Quality systems, inspection practice and safe execution are central to the proposed KEEPL pre-qualification information.</p><p>The concept note references East End’s ISO 9001 quality policy, IBR approval for boilers, PESO-compliant tankers and ISO 45001:2018 implementation roadmap.</p><p>These are parent references, not a statement of KEEPL certification. Approved policies, valid certificates and verified safe man-hours have not yet been supplied for this preview.</p>'},downloads:{title:'Company documents',body:'<p>The planned library includes the company profile, pre-qualification dossier, certificates and statutory documents.</p><p>No approved files have been supplied yet. Downloads and email delivery will become available once the documents and routing contacts are confirmed.</p>'},careers:{title:'Build your next chapter',body:'<p>Industrial execution brings together mechanical engineers, piping specialists, welders, supervisors, quality teams and safety professionals.</p><p>No verified vacancies have been supplied for this preview. Use the Careers enquiry type to preview an expression of interest. Applications are not sent or stored.</p>'}};
const projects={paradip:['IOCL Paradip','Storage tank fabrication and erection. The concept note also references HVLRM work at IOCL Paradip.'],jspl:['JSPL Angul','Industrial piping execution referenced in the East End project experience.'],bhel:['BHEL–IOCL SRU','Sulphur recovery unit project experience referenced in the client concept note. Detailed work scope has not yet been provided.'],syngas:['API Syngas Phase II','Industrial project experience referenced in the client concept note. Detailed work scope has not yet been provided.']};
const dialog=$('#detail-dialog');function openPanel(title,body){$('#dialog-title').textContent=title;$('#dialog-body').innerHTML=body;dialog.showModal()}
$$('[data-panel]').forEach(b=>b.onclick=()=>{const p=panels[b.dataset.panel];openPanel(p.title,p.body)});$$('[data-project]').forEach(b=>b.onclick=()=>{const p=projects[b.dataset.project];openPanel(p[0],`<p>${p[1]}</p><div class="dialog-facts"><div><small>EXPERIENCE ATTRIBUTION</small>East End Technologies</div><div><small>SECTOR</small>${b.dataset.sector==='steel'?'Steel':'Refinery & petrochemical'}</div></div><p>Project dates, tonnage, delivery status and completion certificates are awaiting verification. This entry is parent experience, not a KEEPL completion claim.</p>`)});
$('.close-dialog').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});$('.dialog-contact').onclick=()=>{dialog.close();location.hash='contact'};
$('#enquiry').addEventListener('submit',e=>{e.preventDefault();$('#form-status').textContent='Enquiry preview complete. Your details have not been sent or saved. The live form will be connected once the KEEPL contact destination is confirmed.'});
