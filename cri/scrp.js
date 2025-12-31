// Intersection Observer for fade-in 
const fades=document.querySelectorAll('.fade');
const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show');});
},{threshold:0.2});
fades.forEach(f=>observer.observe(f));
// Team slider auto-scroll
const slider = document.getElementById('teamSlider');
const next = document.querySelector('.slide-btn.next');
const prev = document.querySelector('.slide-btn.prev');
const scrollAmount = 320;
/* Buttons */
next.addEventListener('click', () => {
  slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
prev.addEventListener('click', () => {
  slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
/* Auto slide */
let autoSlide = setInterval(autoScroll, 4500);
function autoScroll() {
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
    slider.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
/* Pause on interaction */
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => autoSlide = setInterval(autoScroll, 4500));
slider.addEventListener('touchstart', () => clearInterval(autoSlide));
slider.addEventListener('touchend', () => autoSlide = setInterval(autoScroll, 4500));