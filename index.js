import{S as u,i as n}from"./assets/vendor-BrddEoy-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function p(s){const o="47281982-63a34c7367b72af3cb7b29a97",i="https://pixabay.com/api/?",r=new URLSearchParams({key:o,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}),e=i+r;return fetch(e).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}const m=new u(".gallery-link",{captionsData:"alt",captionDelay:250}),f=document.querySelector(".gallery");function d(s){const o=s.map(r=>`<li class="gallery-item">
  <a class="gallery-link"
    href="${r.largeImageURL}"
    >
    <img
      src="${r.webformatURL}"
      alt="${r.tags}"
  />
   <ul class="img-dscr">
    <li>
      <p><b>Likes</b> ${r.likes}</p>
    </li>
    <li>
      <p><b>Views</b> ${r.views}</p>
    </li>
    <li>
      <p><b>Comments</b> ${r.comments}</p>
    </li>
    <li>
      <p><b>Downloads</b> ${r.downloads}</p>
    </li>
  </ul>
  </a>
</li>`).join("");f.insertAdjacentHTML("beforeend",o),document.querySelectorAll(".gallery-link").length>0&&m.refresh()}const h=document.querySelector(".form"),c=document.querySelector("input"),a=document.querySelector(".loader");let g=new u(".gallery a",{captionsData:"alt",captionDelay:250});h.addEventListener("submit",s=>{s.preventDefault(),a.classList.add("is-open"),f.innerHTML="";const o=c.value.trim();if(o==="")return a.classList.remove("is-open"),n.warning({title:"Caution",message:"Please complete the field!",position:"topRight"});p(o).then(i=>{if(i.hits.length===0)return n.info({title:"Sorry",message:"There are no images matching your search query. Please try again!",position:"topRight"});d(i.hits),g.refresh()}).catch(i=>{console.error("Error fetching images:",i),n.error({title:"Error",message:"There was an error fetching the images.",position:"topRight"})}).finally(()=>{a.classList.remove("is-open")}),c.value=""});
//# sourceMappingURL=index.js.map
