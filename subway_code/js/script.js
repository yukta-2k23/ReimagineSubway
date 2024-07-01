// CUSTOM CURSOR
const coords = { x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle){
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;

});

function animateCircles() {
    
    const rect = document.body.getBoundingClientRect();
    let x = coords.x - rect.left;
    let y = coords.y - rect.top; 

    circles.forEach(function (circle, index) {

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.1;
        y += (nextCircle.y - y) * 0.1;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

//Section3 sticky scroll reveal

const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")
const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)")


gsap.set(photos, {yPercent:101})

const allPhotos = gsap.utils.toArray(".desktopPhoto")



let mm = gsap.matchMedia();

mm.add("(min-width: 600px)", () => {
  console.log("desktop")
	
  ScrollTrigger.create({
	trigger:".gallery",
	start:"top top",
	end:"bottom bottom",
	pin:".right"
})

details.forEach((detail, index)=> {

	let headline = detail.querySelector("h1")
	let animation = gsap.timeline()
	   .to(photos[index], {yPercent:0})
	   .set(allPhotos[index], {autoAlpha:0})
	ScrollTrigger.create({
		trigger:headline,
		start:"top 80%",
		end:"top 50%",
		animation:animation,
		scrub:true,
		markers:false
	})
})
	
	
  
  return () => { // optional
    // custom cleanup code here (runs when it STOPS matching)
	  console.log("mobile")
  };
});

// CurvedDiv section4 ON SCROLL
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(scrollPosition / maxScroll, 1);
    const borderRadius = scrollPercentage * 100; // Max border-radius value
    document.getElementById('curvedDiv').style.borderBottomLeftRadius = `${borderRadius}px`;
    document.getElementById('curvedDiv').style.borderBottomRightRadius = `${borderRadius}px`;
});

