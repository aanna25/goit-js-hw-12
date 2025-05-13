import{a as m,S as f,i as a}from"./assets/vendor-Bz4lgVUE.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const p="https://pixabay.com/api/",g="50191588-7d0b750c5d17d1451aa626dbf";function h(o){const s={key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};return m.get(p,{params:s}).then(r=>r.data).catch(r=>{throw r})}const y=new f(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){const s=document.querySelector(".gallery"),r=o.map(({webformatURL:n,largeImageURL:e,tags:t,likes:i,views:l,comments:u,downloads:d})=>`
        <li class="gallery-item">
          <a href="${e}">
            <img src="${n}" alt="${t}" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${i}</p>
            <p><b>Views:</b> ${l}</p>
            <p><b>Comments:</b> ${u}</p>
            <p><b>Downloads:</b> ${d}</p>
          </div>
        </li>
      `).join("");s.insertAdjacentHTML("beforeend",r),y.refresh()}function L(){const o=document.querySelector(".gallery");o.innerHTML=""}function S(){document.querySelector(".loader").classList.remove("hidden")}function q(){document.querySelector(".loader").classList.add("hidden")}const c=document.querySelector(".form"),P=c.querySelector("[name='search-text']");c.addEventListener("submit",v);function v(o){o.preventDefault();const s=P.value.trim();if(!s){a.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}S(),L(),h(s).then(r=>{r.hits.length===0?a.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(b(r.hits),a.success({title:"Success",message:`You found ${r.hits.length} images`,position:"topRight"}))}).catch(r=>{a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{q(),c.reset()})}
//# sourceMappingURL=index.js.map
