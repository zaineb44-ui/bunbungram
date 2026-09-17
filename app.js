const feed=document.querySelector("#feed"),tpl=document.querySelector("#reelTpl"),toast=document.querySelector("#toast");
let reels=[],mode="home",globalMuted=false;
const liked=JSON.parse(localStorage.getItem("bbg-liked")||"{}");

function msg(s){toast.textContent=s;toast.classList.add("show");clearTimeout(msg.t);msg.t=setTimeout(()=>toast.classList.remove("show"),1400)}
function titleFromFile(file){return file.replace(/\.[^/.]+$/,"").replace(/[-_]+/g," ").replace(/\s+/g," ").trim()}
async function load(){
  try{
    const r=await fetch("videos.json?"+Date.now());
    if(!r.ok)throw Error();
    reels=await r.json();
  }catch(e){reels=[]}
  render();
}
function data(){return mode==="liked"?reels.filter(x=>liked[x.id]):reels}
function render(){
  feed.innerHTML="";
  const arr=data();
  if(!arr.length){
    feed.innerHTML=`<div class="empty"><div><div class="rabbit">🐰</div><h2>${mode==="liked"?"No liked reels yet":"No reels yet"}</h2><p>${mode==="liked"?"Double-tap or press the heart on a reel.":"Add MP4/WebM videos to the videos folder, then run update-videos.bat."}</p></div></div>`;
    return;
  }
  arr.forEach(item=>{
    const n=tpl.content.cloneNode(true),article=n.querySelector(".reel"),v=n.querySelector("video");
    article.dataset.id=item.id;v.src=item.src;v.muted=globalMuted;
    n.querySelector(".caption").textContent=item.caption||titleFromFile(item.file||"BunBun memory");
    const like=n.querySelector(".like");
    if(liked[item.id]){like.classList.add("liked");like.querySelector(".circle").textContent="♥"}
    function setLike(on=true){
      if(on)liked[item.id]=true;else delete liked[item.id];
      localStorage.setItem("bbg-liked",JSON.stringify(liked));
      like.classList.toggle("liked",!!liked[item.id]);like.querySelector(".circle").textContent=liked[item.id]?"♥":"♡";
    }
    like.onclick=()=>setLike(!liked[item.id]);
    let lastTap=0;
    v.addEventListener("click",()=>{
      const now=Date.now();
      if(now-lastTap<330){setLike(true);const h=article.querySelector(".heart-pop");h.classList.remove("pop");void h.offsetWidth;h.classList.add("pop")}
      else setTimeout(()=>{if(Date.now()-lastTap>=300){v.paused?v.play().catch(()=>{}):v.pause()}},310);
      lastTap=now;
    });
    n.querySelector(".big-play").onclick=()=>v.play().catch(()=>{});
    v.onplay=()=>article.classList.remove("paused");v.onpause=()=>article.classList.add("paused");
    v.ontimeupdate=()=>article.querySelector(".timeline div").style.width=(v.duration?v.currentTime/v.duration*100:0)+"%";
    n.querySelector(".sound").onclick=()=>{v.muted=!v.muted;article.querySelector(".sound .circle").textContent=v.muted?"🔇":"🔊"};
    n.querySelector(".fullscreen").onclick=()=>{(v.requestFullscreen||v.webkitRequestFullscreen)?.call(v)};
    n.querySelector(".share").onclick=async()=>{
      const url=location.origin+location.pathname+"#"+encodeURIComponent(item.id);
      try{if(navigator.share)await navigator.share({title:"BunBunGram",text:item.caption||"BunBunGram reel",url});else{await navigator.clipboard.writeText(url);msg("Link copied ♡")}}catch(e){}
    };
    feed.appendChild(n);
  });
  watch();
  const id=decodeURIComponent(location.hash.slice(1));
  if(id)requestAnimationFrame(()=>document.querySelector(`.reel[data-id="${CSS.escape(id)}"]`)?.scrollIntoView());
}
let io;
function watch(){
  io?.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{
    const v=e.target.querySelector("video");
    if(e.isIntersecting&&e.intersectionRatio>.7){
      document.querySelectorAll(".reel video").forEach(o=>{if(o!==v)o.pause()});
      v.muted=globalMuted;v.play().catch(()=>e.target.classList.add("paused"));
      history.replaceState(null,"","#"+encodeURIComponent(e.target.dataset.id));
    }else v.pause()
  }),{threshold:[0,.7,1]});
  document.querySelectorAll(".reel").forEach(x=>io.observe(x))
}
document.querySelector("#globalSound").onclick=e=>{globalMuted=!globalMuted;e.currentTarget.textContent=globalMuted?"🔇":"🔊";document.querySelectorAll("video").forEach(v=>v.muted=globalMuted);document.querySelectorAll(".sound .circle").forEach(x=>x.textContent=globalMuted?"🔇":"🔊")};
document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");
  if(b.dataset.mode==="random"){mode="home";render();const a=[...document.querySelectorAll(".reel")];a[Math.floor(Math.random()*a.length)]?.scrollIntoView()}
  else{mode=b.dataset.mode;render();feed.scrollTo(0,0)}
});
const about=document.querySelector("#about");document.querySelector("#infoBtn").onclick=()=>about.showModal();about.querySelector(".close").onclick=()=>about.close();
load();