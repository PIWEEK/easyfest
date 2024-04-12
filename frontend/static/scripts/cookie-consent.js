(function(d){typeof define=="function"&&define.amd?define(d):d()})(function(){"use strict";var d=typeof document<"u"?document.currentScript:null;/*! js-cookie v3.0.5 | MIT */function p(n){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)n[r]=a[r]}return n}var _={read:function(n){return n[0]==='"'&&(n=n.slice(1,-1)),n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(n){return encodeURIComponent(n).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function C(n,e){function a(o,s,t){if(!(typeof document>"u")){t=p({},e,t),typeof t.expires=="number"&&(t.expires=new Date(Date.now()+t.expires*864e5)),t.expires&&(t.expires=t.expires.toUTCString()),o=encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var c in t)t[c]&&(i+="; "+c,t[c]!==!0&&(i+="="+t[c].split(";")[0]));return document.cookie=o+"="+n.write(s,o)+i}}function r(o){if(!(typeof document>"u"||arguments.length&&!o)){for(var s=document.cookie?document.cookie.split("; "):[],t={},i=0;i<s.length;i++){var c=s[i].split("="),w=c.slice(1).join("=");try{var m=decodeURIComponent(c[0]);if(t[m]=n.read(w,m),o===m)break}catch{}}return o?t[o]:t}}return Object.create({set:a,get:r,remove:function(o,s){a(o,"",p({},s,{expires:-1}))},withAttributes:function(o){return C(this.converter,p({},this.attributes,o))},withConverter:function(o){return C(p({},this.converter,o),this.attributes)}},{attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(n)}})}var u=C(_,{path:"/"}),x={VITE_COOKIE_POLICY_URL:"https://penpotfest.org/cookie-policy/",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const l={cookie:{name:x.VITE_COOKIE_NAME||"cookie-consent",policyUrl:"https://penpotfest.org/cookie-policy/",options:{expires:new Date(new Date().getFullYear()+1,0,1)}}},E=`@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");

.CookieConsent_wrapper {
  --font-size-00: 0.5em;
  --font-size-0: 0.75em;
  --font-size-1: 1em;
  --font-size-2: 1.1em;
  --font-size-3: 1.25em;
  --font-size-4: 1.5em;
  --font-size-5: 2em;
  --font-size-6: 2.5em;
  --font-size-7: 3em;
  --font-size-8: 3.5em;

  --gray-60: #1f1f1f;
  --gray-canvas: #f6f6f6;
  --dark-gray: #1c2022;
  --primary: #31efb8;
  --size-000: -0.5em;
  --size-00: -0.25em;
  --size-1: 0.25em;
  --size-2: 0.5em;
  --size-3: 1em;
  --size-4: 1.25em;
  --size-5: 1.5em;
  --size-6: 1.75em;
  --size-7: 2em;
  --size-8: 3em;
  --size-9: 4em;
  --size-10: 5em;
  --size-11: 7.5em;
  --size-12: 10em;
  --size-13: 15em;
  --size-14: 20em;
  --size-15: 30em;

  all: initial;
  box-sizing: border-box;
  margin: 0;
  isolation: isolate;
  display: flex;
  font-size: 16px !important;
  justify-content: center;
  inline-size: 100%;
  position: fixed;
  inset-block-end: var(--size-6);
  z-index: 100;
}

.CookieConsent_panel {
  container-type: inline-size;
  background: var(--gray-60);
  color: var(--gray-canvas);
  padding: var(--size-5);
  line-height: 1.5;
  inline-size: 90%;
  max-inline-size: 1280px;
  box-shadow: 0 10px 30px 0 hsla(220, 3%, 40%, .25);
  border-radius: 8px;
  font-size: var(--font-size-1);
  font-family: Work Sans, sans-serif;
  border: 1px solid #a599c6;
}

.CookieConsent_msg {
  margin: 0;
  max-width: max-content;
  font-size: var(--font-size-1);
}

.CookieConsent_link {
  color: var(--gray-canvas);
  font-weight: 600;
}

.CookieConsent_button {
  border-radius: 8px;
  border: none;
  padding: 12px 16px;
  font-family: Work Sans, sans-serif;
  font-size: var(--font-size-1);
}

.CookieConsent_button:hover {
  color: var(--primary);
  background-color: var(--dark-gray);
  cursor: pointer;
}

.CookieConsent_accept {
  color: var(--dark-gray);
  background-color: var(--primary);
}

.CookieConsent_decline {
  color: var(--dark-gray);
  background-color: #c6c9d7;
}

.CookieConsent_actions {
  display: flex;
  gap: var(--size-5);
  -webkit-margin-before: var(--size-5);
  margin-block-start: var(--size-5);
}

@container (min-width: 768px) {
  .CookieConsent_inner {
    display: flex;
    align-items: flex-end;
    gap: var(--size-5);
  }

  .CookieConsent_actions {
    -webkit-margin-before: 0;
    margin-block-start: 0;
  }
}
`,D=`<div class="CookieConsent_wrapper">
  <div class="CookieConsent_panel">
    <div class="CookieConsent_inner">
      <div class="CookieConsent_msg">
        {{ message }}
        <a class="CookieConsent_link" target="_blank" data-link>
          {{ link }}
        </a>.
      </div>
      <div class="CookieConsent_actions">
        <button
          type="button"
          class="CookieConsent_button CookieConsent_decline"
          data-decline
        >
          {{ decline }}
        </button>
        <button
          type="button"
          class="CookieConsent_button CookieConsent_accept"
          data-accept
        >
          {{ accept }}
        </button>
      </div>
    </div>
  </div>
</div>
`,v={en:{message:"Let’s be honest, who likes cookies? We don’t love them but they help us improve our content and traffic analysis. Learn more about our",link:"Cookie policy",accept:"Accept",decline:"Decline"},es:{message:"Seamos honestos, ¿a quién le gustan las cookies? No nos encantan, pero nos ayudan a mejorar nuestro contenido y análisis de tráfico. Obtenga más información sobre nuestra",link:"Política de cookies",accept:"Aceptar",decline:"Rechazar"}};function L(n,e="en"){if(navigator.language in n)return navigator.language;const a=navigator.language.split("-")[0];if(a in n)return a;for(const r of navigator.languages)if(r in n)return r;return e}function S(n,e,a){return n[e][a.trim()]}const h={getLanguage:L,getTranslation:S};function U(n){if(!n.onAccept||!n.onDecline||typeof n.onAccept!="function"||typeof n.onDecline!="function")throw new TypeError("You must provide onAccept and onDecline functions");function e(k){return g=>{g.preventDefault(),k(g),document.body.removeChild(i)}}const a=h.getLanguage(v),r=document.createElement("style");r.textContent=E,document.head.appendChild(r);const o=new DOMParser,s=D.replace(/\{\{(.*?)\}\}/g,(k,g)=>h.getTranslation(v,a,g)),t=o.parseFromString(s,"text/html"),i=document.importNode(t.body.firstElementChild,!0),c=i.querySelector("[data-link]");c.href=n.policyUrl,i.querySelector("[data-accept]").addEventListener("click",e(n.onAccept),{once:!0}),i.querySelector("[data-decline]").addEventListener("click",e(n.onDecline),{once:!0}),document.body.appendChild(i)}function R(n){(function(e,a,r,o,s){e[o]=e[o]||[],e[o].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var t=a.getElementsByTagName(r)[0],i=a.createElement(r),c=o!="dataLayer"?"&l="+o:"";i.async=!0,i.src="https://www.googletagmanager.com/gtm.js?id="+s+c,t.parentNode.insertBefore(i,t)})(window,document,"script","dataLayer",n)}function A(){window.addEventListener("hashchange",function(e){"gtag"in window?gtag("event","page_view",{page_title:window.title,page_location:location.href}):console.warn("gtag not found")})}function y(n){switch(R(n.get("gtm")),location.origin){case"https://help.penpot.app":break;case"https://community.penpot.dev":case"https://community.penpot.app":break;case"https://design.penpot.dev":case"https://design.penpot.app":A();break}}const O=y,f={ACCEPTED:"accepted",DECLINED:"declined"};function z(){var e;return(e=document==null?void 0:document.currentScript)!=null&&e.src?new URL(document.currentScript.src).searchParams:new URL(typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:d&&d.src||new URL("penpot-cookie-consent.umd.cjs",document.baseURI).href).searchParams}function I(){const n=location.hostname.match(/(\.?penpot\.(local|dev|app))/);if(n){const[,e]=n;return e.startsWith(".")?e:`.${e}`}}function b(){const n=I();return n?{...l.cookie.options,domain:n}:{...l.cookie.options}}function T(){U({policyUrl:l.cookie.policyUrl,onAccept:()=>{u.set(l.cookie.name,f.ACCEPTED,b()),y(z())},onDecline:()=>{u.set(l.cookie.name,f.DECLINED,b())}})}function j(){return!Object.values(f).includes(u.get(l.cookie.name))}function B(){return u.get(l.cookie.name)===f.ACCEPTED}j()?T():B()&&O(z())});
