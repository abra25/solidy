// Optional: dynamic floating effect
  const img = document.querySelector('.interactive-img');
  let offset = 0;
  function floatImage(){
    offset += 0.5;
    img.style.transform = `translateY(${Math.sin(offset/10)*10}px) rotate(${Math.sin(offset/20)*5}deg)`;
    requestAnimationFrame(floatImage);
  }
  floatImage();