import{S as w,a as I,i as v}from"./assets/vendor-1feca4b1.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const m=document.getElementById("searchForm"),a=document.getElementById("searchInput"),d=document.getElementById("gallery"),s=document.getElementById("loader"),t=document.getElementById("loadMoreBtn"),o="41927484-8453b2dd3e18520885b5ece2f",c="https://pixabay.com/api/";let u=1;const L=new w(".gallery a");function p(e){const r=document.createDocumentFragment();e.map(i=>{const l=E(i);r.appendChild(l)}),d.appendChild(r),L.refresh(),g();const n=e.length===40;h(n)}function E(e){const r=document.createElement("div");r.className="card";const n=document.createElement("a");n.href=e.largeImageURL,n.setAttribute("data-lightbox","gallery"),n.setAttribute("data-title",e.tags);const i=document.createElement("img");i.src=e.largeImageURL,i.alt=e.tags,n.appendChild(i),r.appendChild(n);const l=document.createElement("div");return l.className="image-info",l.innerHTML=`
      <p>Likes: ${e.likes}</p>
      <p>Views: ${e.views}</p>
      <p>Comments: ${e.comments}</p>
      <p>Downloads: ${e.downloads}</p>
    `,r.appendChild(l),r}async function f(e,r){try{return b(),(await I.get(c,{params:{key:o,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}})).data.hits}catch(n){throw console.error("Error fetching images:",n),y("An error occurred while fetching images. Please try again later."),n}finally{g()}}function b(){s.style.display="block"}function g(){s.style.display="none"}function y(e){v.error({title:"Error",message:e})}function h(e){t.style.display=e?"block":"none"}m.addEventListener("submit",async function(e){e.preventDefault();const r=a.value.trim();if(r!==""){d.innerHTML="",u=1;try{const n=await f(r,u);n.length===0?y("Sorry, there are no images matching your search query. Please try again!"):p(n)}catch{}}}),t.addEventListener("click",async function(){u++;const e=a.value.trim();try{const r=await f(e,u);r.length>0?p(r):h(!1)}catch{}})});
//# sourceMappingURL=commonHelpers.js.map
