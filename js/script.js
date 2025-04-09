document.addEventListener('DOMContentLoaded', () => {
    let currentSection = '';
    let lastSection = currentSection;
    const sectionIds = ['home', 'about', 'skills', 'contact'];
    const sections = document.querySelectorAll('.section');
    const sectionIndicators = document.querySelectorAll('.section-indicator');
    const cursorFollower = document.querySelector('.cursor-follower');

    const updateCursorStyle = (target) => {
        if (['A', 'BUTTON'].includes(target.tagName) ||
                target.classList.contains('option') ||
                target.classList.contains('section-indicator')) {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.backgroundColor = 'rgba(255, 0, 51, 0.2)';
        } else {
            cursorFollower.style.width = '20px';
            cursorFollower.style.height = '20px';
            cursorFollower.style.backgroundColor = 'rgba(255, 0, 51, 0.5)';
        }
    };

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY, target } = e;
        cursorFollower.style.opacity = '1';
        setTimeout(() => {
            cursorFollower.style.transform = `translate(${clientX - cursorFollower.offsetWidth / 2}px, ${clientY - cursorFollower.offsetHeight / 2}px)`;
        }, 50);
        updateCursorStyle(target);
    });

    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
    });

    sectionIndicators.forEach(indicator =>
        indicator.addEventListener('click', () => {
            const targetSection = indicator.getAttribute('data-section');
            navigateToSection(targetSection);
        })
    );

    const customInteraction = (sectionId) => {
        if (sectionId === 'skills') {
            const skillsGrid = document.querySelector('#skills .skills-grid');
            if (skillsGrid) {
                Array.from(skillsGrid.children).forEach((child, index) => {
                    if (child.animationTimeout) clearTimeout(child.animationTimeout);
                    child.style.opacity = 0;
                    child.style.transform = 'translateY(20px)';
                    child.animationTimeout = setTimeout(() => {
                        child.style.opacity = 1;
                        child.style.transform = 'translateY(0)';
                        child.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                    }, 200 * index);
                });
            }
        }
    };

    const navigateToSection = (sectionId) => {
        if (currentSection === sectionId) return;
        lastSection = currentSection;
        currentSection = sectionId;

        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else if (section.id === lastSection) {
                setTimeout(() => section.classList.remove('active'), 2000);
            }
        });

        sectionIndicators.forEach(indicator => {
            indicator.classList.toggle('active', indicator.getAttribute('data-section') === sectionId);
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });

        customInteraction(sectionId);
    };

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        const currentIndex = sectionIds.indexOf(currentSection);
        const nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < sectionIds.length) {
            navigateToSection(sectionIds[nextIndex]);
        }
    }, { passive: false });

    document.addEventListener('keydown', (e) => {
        const currentIndex = sectionIds.indexOf(currentSection);
        if (['ArrowDown', 'ArrowRight'].includes(e.key) && currentIndex < sectionIds.length - 1) {
            navigateToSection(sectionIds[currentIndex + 1]);
        } else if (['ArrowUp', 'ArrowLeft'].includes(e.key) && currentIndex > 0) {
            navigateToSection(sectionIds[currentIndex - 1]);
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) navigateToSection(targetId);
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => alert('Projects currently unavailable.'));
    });

    navigateToSection('home');
});
