function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  gsap.to("#nav-part1 svg",{
    transform: "translateY(-100%)",
    scrollTrigger:{
        trigger: "#page1",
        scroller: "#main",
        start:"top 0",
        end: "top -5%",
        scrub: 2
    }
  });

  gsap.to("#nav-part2 #links",{
    transform: "translateY(-100%)",
    opacity:0,
    scrollTrigger:{
        trigger: "#page1",
        scroller: "#main",
        start:"top 0",
        end: "top -5%",
        scrub: 2
    }
  })
  
}













locomotiveAnimation();




function spanText(){
  const text = document.querySelector('.circular-text p');
  text.innerHTML = text.innerText.split("").map(
      (char, i) => `<span style="transform:rotate(${i * 12}deg)">${char}</span>`
  ).join("");
  
}
spanText();

function loadinganimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.2,
        durattion: 0.3,
        stagger: 0.1
    })

}
loadinganimation();

function cursorAnimation(){
  document.addEventListener("mousemove", function(dets){
    gsap.to("#cursor",{
      left: dets.x,
      top:dets.y
    })
  })
  
  
  document.querySelector("#page4").addEventListener("mouseenter", function() {
    gsap.to("#cursor", {
      scale: 1,
      ease: "elastic.in(10, 10)", // Example of using an elastic ease
    });
  });
  
  document.querySelector("#page4").addEventListener("mouseleave", function() {
    gsap.to("#cursor", {
      scale: 0, // You might want to scale it down or hide it when leaving the element
      ease: "power4.in", // Example of using a different ease when leaving
    });
  });
  
}
cursorAnimation();
