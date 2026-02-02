// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 커리큘럼 아코디언
    initCurriculumAccordion();

    // FAQ 아코디언
    initFaqAccordion();

    // 모바일 메뉴
    initMobileMenu();

    // 스크롤 애니메이션
    initScrollAnimations();

    // 헤더 스크롤 효과
    initHeaderScroll();

    // 부드러운 스크롤
    initSmoothScroll();

    // 숫자 카운트업 애니메이션
    initCountUp();
});

// 커리큘럼 아코디언
function initCurriculumAccordion() {
    const weeks = document.querySelectorAll('.curriculum-week');

    // 첫 번째 아이템 기본 열기
    if (weeks.length > 0) {
        weeks[0].classList.add('active');
    }

    weeks.forEach(week => {
        const header = week.querySelector('.week-header');

        header.addEventListener('click', () => {
            const isActive = week.classList.contains('active');

            // 모든 아이템 닫기
            weeks.forEach(w => w.classList.remove('active'));

            // 클릭한 아이템 토글
            if (!isActive) {
                week.classList.add('active');
            }
        });
    });
}

// FAQ 아코디언
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 모든 아이템 닫기
            faqItems.forEach(i => i.classList.remove('active'));

            // 클릭한 아이템 토글
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// 모바일 메뉴
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // 메뉴 항목 클릭 시 닫기
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// 스크롤 애니메이션
function initScrollAnimations() {
    // 애니메이션 대상 요소들 선택
    const animateElements = document.querySelectorAll(
        '.problem-card, .solution-item, .curriculum-week, .review-card, .pricing-card, .faq-item'
    );

    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // 각 요소에 fade-in 클래스 추가 및 관찰 시작
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index % 4 * 0.1}s`;
        observer.observe(el);
    });
}

// 헤더 스크롤 효과
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 스크롤 방향에 따라 헤더 표시/숨기기
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        // 스크롤 시 헤더 배경 변경
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// 부드러운 스크롤
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// 숫자 카운트업 애니메이션
function initCountUp() {
    const countElements = document.querySelectorAll('.stat-number, .summary-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    countElements.forEach(el => observer.observe(el));
}

function animateCount(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasKorean = text.includes('억') || text.includes('명');

    // 숫자 추출
    let number = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(number)) return;

    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutQuart 이징
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(number * easeProgress);

        // 원래 형식 유지
        let displayValue = currentValue.toLocaleString();

        if (text.includes('억')) {
            displayValue = displayValue + '억+';
        } else if (hasPercent) {
            displayValue = displayValue + '%';
        } else if (text.includes('명')) {
            displayValue = displayValue + '명';
        } else if (hasPlus) {
            displayValue = displayValue + '+';
        }

        element.textContent = displayValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // 최종 값 복원
            element.textContent = text;
        }
    }

    requestAnimationFrame(update);
}

// 모바일 메뉴 CSS 동적 추가
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            gap: 16px;
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }

    .header {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(mobileMenuStyles);
