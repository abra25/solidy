
 // Intersection Observer for fade-in 
  const fades=document.querySelectorAll('.fade');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show');});
},{threshold:0.2});
fades.forEach(f=>observer.observe(f));