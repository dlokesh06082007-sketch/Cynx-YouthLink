document.addEventListener('DOMContentLoaded', () => {
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on cursor position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust divisor for tilt sensitivity
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;
            
            element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            // Reset to default with smooth transition
            element.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Add glowing trail effect to mouse movement inside container
    const body = document.querySelector('body');
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    body.appendChild(glow);

    // Track mouse movement
    let requestId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!requestId) {
            requestId = requestAnimationFrame(updateGlow);
        }
    });
    
    function updateGlow() {
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
        requestId = null;
    }
});
