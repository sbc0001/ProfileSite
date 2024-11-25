// 히어로 섹션 애니메이션
gsap.registerPlugin(ScrollTrigger);

// 커스텀 커서// Custom cursor animation
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');


gsap.set(cursor, {xPercent: -50, yPercent: -50});
gsap.set(follower, {xPercent: -50, yPercent: -50});

window.addEventListener('mousemove', e => {
    gsap.to(cursor, {duration: 0.2, x: e.clientX, y: e.clientY});
    gsap.to(follower, {duration: 0.6, x: e.clientX, y: e.clientY});
});

// 마우스 호버 효과
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5 });
        gsap.to(cursorFollower, { scale: 1.5 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1 });
        gsap.to(cursorFollower, { scale: 1 });
    });
});        

// Fade in animations
gsap.utils.toArray('.fade-in, .hero-content p, .section-title, .project-card, .projects-grid, .stat-item, .content-item, .timeline-item').forEach(elem => {
    gsap.fromTo(elem, 
        {opacity: 0, y: 50},
        {
            scrollTrigger: {
                trigger: elem,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1
        }
    );
});

gsap.set(".hero-title", { filter:"blur(10px)", opacity:0 });
gsap.to(".hero-title",{
    filter:"blur(0px)", opacity:1, duration:1,
    ease:"power2.out",
    scrollTrigger:{
        trigger:".hero-title",
        start:"top 80%",
        end:"top 50%",
        toggleActions:"play none none reverse"
    }
})

// Slide up animations
gsap.utils.toArray('.slide-up, .hero-cta, form, .filter-container').forEach(elem => {
    gsap.fromTo(elem,
        {opacity: 0, y: 100},
        {
            scrollTrigger: {
                trigger: elem,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1
        }
    );
});


// 파티클 효과
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 랜덤 크기 설정 (2px - 7px)
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 초기 위치 설정
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        hero.appendChild(particle);

        // 개별 파티클 애니메이션
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    // 랜덤 지속 시간 (20-40초)
    const duration = Math.random() * 20 + 20;
    
    // 랜덤 이동 거리
    const xDistance = Math.random() * 200 - 100;
    const yDistance = Math.random() * 200 - 100;

    // GSAP 타임라인 생성
    const tl = gsap.timeline({
        repeat: -1, // 무한 반복
        yoyo: true, // 왕복 움직임
    });

    // 파티클 움직임 애니메이션
    tl.to(particle, {
        x: xDistance,
        y: yDistance,
        duration: duration,
        ease: "none",
        opacity: gsap.utils.random(0.1, 0.7),
        scale: gsap.utils.random(0.8, 1.2),
    });

    // 추가 회전 효과
    gsap.to(particle, {
        rotation: Math.random() * 360,
        duration: duration * 0.8,
        repeat: -1,
        ease: "none"
    });
}

// 페이지 로드 시 파티클 생성
window.addEventListener('load', () => {
    createParticles();
});

// 화면 크기 변경 시 파티클 재생성
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // 기존 파티클 제거
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
        // 새로운 파티클 생성
        createParticles();
    }, 250);
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3
                });
            } else {
                gsap.to(card, {
                    opacity: 0.3,
                    scale: 0.95,
                    duration: 0.3
                });
            }
        });
    });
});