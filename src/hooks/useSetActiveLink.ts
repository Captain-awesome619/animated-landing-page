import gsap from "gsap";

export function useSetActiveLink() {
    

  function setActive(id: string) {
    const links = document.querySelectorAll("nav .nav-link");
    
    const section = document.body.querySelector(`#${id}`);
    const matchingLink = document.querySelector(`[data-link="${id}"]`); 

    links.forEach(l => l.classList.remove("active"));
    matchingLink?.classList.add("active");
  }

  return {setActive}
}