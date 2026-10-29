/* RTools Comic: shared navigation + tool list.
   To add a tool, add one object to RTOOLS.tools below. The navbar on every page and the cards on the home page update automatically. */
(()=>{
const base=new URL('.',document.currentScript.src),X=location.protocol==='file:'?'index.html':'';
const star=(()=>{let d='';for(let k=0;k<18;k++){const a=k*Math.PI/9-Math.PI/2,r=k%2?11:21;d+=(k?'L':'M')+(24+Math.cos(a)*r).toFixed(1)+' '+(24+Math.sin(a)*r).toFixed(1)}return d+'Z'})();
const ICON={
 sfx:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 33 22 9l12 24M15.5 24h13"/><path d="M6 42q5-6 9.5 0t9.5 0 9.5 0 9.5 0" stroke-width="3"/></svg>',
 bg:'<svg viewBox="0 0 48 48" fill="currentColor" stroke="currentColor" stroke-linecap="round"><circle cx="9" cy="9" r="1.5" stroke="none"/><circle cx="19" cy="9" r="2.5" stroke="none"/><circle cx="29" cy="9" r="3.5" stroke="none"/><circle cx="39" cy="9" r="4.5" stroke="none"/><circle cx="9" cy="21" r="1" stroke="none"/><circle cx="19" cy="21" r="1.5" stroke="none"/><circle cx="29" cy="21" r="2.5" stroke="none"/><circle cx="39" cy="21" r="3.5" stroke="none"/><path d="M6 33h20M6 39h30M6 45h14" stroke-width="3.5" fill="none"/></svg>',
 comic:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="'+star+'"/><path d="M24 16.5v8M24 30v.5" stroke-linecap="round" stroke-width="3.5"/></svg>'
};
ICON.crop='<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6v28h28M6 14h28v28"/></svg>';
ICON.bubble='<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="M24 8C14 8 6 14 6 22c0 4 2 7.500 5.500 10L10 41l8.500-5c1.800.4 3.600.6 5.500.6 10 0 18-6.200 18-14.200S34 8 24 8z"/><path d="M16.500 22h.1M24 22h.1M31.500 22h.1" stroke-width="4"/></svg>';
window.RTOOLS={X,brand:'RTools Comic',tools:[
 {name:'SFX Animator',dir:'sfx_animator',icon:ICON.sfx,desc:'Animated onomatopoeia text, JJBA style. Curves, gradients, strokes, wiggle, shake, and textures.',tag:'Exports WebM, MP4, PNG sequence, GIF'},
 {name:'Comic SFX Maker',dir:'comic_sfx',icon:ICON.comic,desc:'American comic sound effects: POW and BAM text over Ben-Day dot bursts with extruded 3D lettering.',tag:'Exports PNG, PNG sequence, WebM, MP4, GIF'},
 {name:'Comic Bubble Maker',dir:'bubble',icon:ICON.bubble,desc:'Animated comic speech bubbles: speech, thought, shout, whisper, and more, with halftone shading and typewriter text.',tag:'Exports PNG, PNG sequence, WebM, MP4, GIF'},
 {name:'Anime BG Maker',dir:'bg_anime',icon:ICON.bg,desc:'Anime-style backgrounds: halftone, speed lines, focus lines, and rays. Supports looping animation and transparent output.',tag:'Exports PNG, PNG sequence, WebM, MP4'},
 {name:'Image Cropper',dir:'crop',icon:ICON.crop,desc:'Crop pasted screenshots to an exact pixel size, add a frame and shadow, and export static PNG or an animated clip.',tag:'Exports PNG, ZIP, WebM, MP4, GIF'}
]};
class RtNav extends HTMLElement{
 connectedCallback(){
  if(this.shadowRoot)return;
  const r=this.attachShadow({mode:'open'}),B=window.RTOOLS,p=location.pathname.replace(/index\.html$/,'');
  const items=[{name:'Home',href:base.href+X,on:p===base.pathname},...B.tools.map(t=>{const u=new URL(t.dir+'/',base);return{name:t.name,href:u.href+X,on:p.startsWith(u.pathname)}})];
  r.innerHTML=`<style>
:host{display:block}
nav{height:52px;display:flex;align-items:center;gap:18px;padding:0 max(16px,calc((100% - 1200px)/2 + 16px));background:rgba(14,11,20,.93);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-bottom:1px solid #2a2238;font-size:14px;font-weight:600}
.brand{display:flex;align-items:center;gap:9px;color:#ece8f5;text-decoration:none;font-weight:800;font-size:15px;white-space:nowrap}
.brand b{display:grid;place-items:center;width:26px;height:26px;border-radius:7px;background:#8b5cf6;color:#fff;font-size:14px}
.links{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;flex:1;min-width:0}
.links::-webkit-scrollbar{display:none}
.links a{padding:8px 12px;border-radius:8px;color:#9a90b0;text-decoration:none;white-space:nowrap;transition:color .15s,background .15s}
.links a:hover{color:#fb923c}
.links a[aria-current]{background:#221a33;color:#c4b5fd}
a:focus-visible{outline:2px solid #fb923c;outline-offset:2px}
@media(max-width:560px){.brand span{display:none}nav{gap:10px;padding:0 12px}}
</style><nav aria-label="Main"><a class="brand" href="${base.href+X}"><b>R</b><span>${B.brand}</span></a><div class="links">${items.map(i=>`<a href="${i.href}"${i.on?' aria-current="page"':''}>${i.name}</a>`).join('')}</div></nav>`;
 }}
if(!customElements.get('rtools-nav'))customElements.define('rtools-nav',RtNav);
const st=document.createElement('style');st.textContent='rtools-nav{display:block;position:sticky;top:env(safe-area-inset-top,0px);z-index:20}:root{--nav-h:52px}';
document.head.append(st);
const add=()=>{if(!document.querySelector('rtools-nav'))document.body.prepend(document.createElement('rtools-nav'))};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',add):add();
})();