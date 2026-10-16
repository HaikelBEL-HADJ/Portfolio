/* ===== À MODIFIER : tes vrais liens et ton email ===== */
const SITE = {
  linkedin: "https://www.linkedin.com/in/ha%C3%AFkel-belhadj",
  github:   "https://github.com/HaikelBEL-HADJ",
  cv:       "https://www.doyoubuzz.com/haikel-bel-hadj", // lien DoYouBuzz ajouté
  email:    "haikel.belhadj133@gmail.com",
  // TODO : crée un formulaire sur https://formspree.io et colle ici son URL (https://formspree.io/f/xxxx)
  formEndpoint: ""
};
/* Icônes (SVG) */
const ICONS = {
  linkedin:'<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z"/>',
  github:'<path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/>',
  cv:'<path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.500V8h4.500L13 3.500ZM8 12h8v1.500H8V12Zm0 3.500h8V17H8v-1.500Z"/>',
  mail:'<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.500L4.500 7v.2L12 13l7.500-5.800V7L12 12.500Z"/>'
};
document.querySelectorAll("[data-link]").forEach(a=>{
  const k=a.dataset.link;
  a.href = k==="email" ? "mailto:"+SITE.email : SITE[k];
  if(k!=="email"){a.target="_blank";a.rel="noopener noreferrer";}
  if(a.dataset.icon!==undefined){a.insertAdjacentHTML("afterbegin",'<svg viewBox="0 0 24 24" aria-hidden="true">'+ICONS[k==="email"?"mail":k]+'</svg>');}
});
/* Menu mobile */
const btn=document.querySelector(".menu"),nav=document.querySelector("nav");
btn?.addEventListener("click",()=>{const o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
/* Apparition progressive */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
/* Formulaire de contact */
const f=document.getElementById("contact-form");
f?.addEventListener("submit",async e=>{
  e.preventDefault();const m=document.getElementById("msg"),d=new FormData(f);
  if(!SITE.formEndpoint){ // Sans service de formulaire : ouvre le client mail
    location.href="mailto:"+SITE.email+"?subject="+encodeURIComponent("Contact portfolio – "+d.get("name"))+"&body="+encodeURIComponent(d.get("message")+"\n\n"+d.get("name")+" ("+d.get("email")+")");
    m.textContent="Ton application mail s'ouvre pour envoyer le message.";return;}
  try{const r=await fetch(SITE.formEndpoint,{method:"POST",body:d,headers:{Accept:"application/json"}});
    if(r.ok){f.reset();m.textContent="Message envoyé, merci !";}else throw 0;}
  catch{m.textContent="Échec de l'envoi. Écris-moi directement par email.";}
});
