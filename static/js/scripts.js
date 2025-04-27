/**
 * Epic Theme - JavaScript Functions
 * Основные функции для шаблона Epic
 */

document.addEventListener('DOMContentLoaded', function() {
    // ------------ Мобильное меню ------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');

    if (hamburgerBtn && mobileNav && closeBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });

        // Закрываем меню при клике на ссылку
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ------------ Кнопка "Наверх" ------------
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.style.display = "none";
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // ------------ Анимация при прокрутке ------------
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-right, .fade-left');
    
    if (animatedElements.length > 0) {
        // Функция проверки видимости элемента в области просмотра
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        }

        // Первоначальная проверка всех элементов
        function checkElements() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('visible');
                }
            });
        }

        // Выполнение проверки при прокрутке и сразу после загрузки
        window.addEventListener('scroll', checkElements);
        checkElements();
    }

    // ------------ Инициализация карты Leaflet ------------
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        // Получаем координаты из data-атрибутов
        const lat = parseFloat(mapElement.dataset.lat || 40.7128);
        const lng = parseFloat(mapElement.dataset.lng || -74.0060);
        const zoom = parseInt(mapElement.dataset.zoom || 13);
        const title = mapElement.dataset.title || 'Our Location';
        
        // Инициализация карты
        const map = L.map('map').setView([lat, lng], zoom);
        
        // Добавление тайлов OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Добавление маркера
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(title)
            .openPopup();
    }

    // ------------ GLightbox для галереи ------------
    // Инициализация GLightbox для галереи с улучшенной навигацией
    const galleryLightboxElements = document.querySelectorAll('a.gallery-lightbox');
    
    if (galleryLightboxElements.length > 0) {
        const lightbox = GLightbox({
            selector: 'a.gallery-lightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            closeOnOutsideClick: true,
            preload: true,
            draggable: true,
            // Расширенные настройки для навигации
            zoomable: true,
            draggableName: true,
            slideExtraAttributes: {
              // Добавляем атрибуты для заголовков и описаний
              'data-title': 'title',
              'data-description': 'data-description'
            },
            plyr: {
              config: {
                ratio: '16:9',
                muted: false,
                hideControls: false,
                youtube: {
                  noCookie: true,
                  rel: 0,
                  showinfo: 0
                }
              }
            }
        });
        
        // Добавляем обработчики клавиш для навигации стрелками
        document.addEventListener('keydown', function(e) {
            // Проверяем, открыт ли lightbox (когда есть элемент с классом glightbox-open на body)
            if (document.body.classList.contains('glightbox-open')) {
                // Left arrow key
                if (e.key === 'ArrowLeft') {
                    lightbox.prevSlide();
                }
                // Right arrow key
                else if (e.key === 'ArrowRight') {
                    lightbox.nextSlide();
                }
                // Escape key (уже поддерживается, но добавим для полноты)
                else if (e.key === 'Escape') {
                    lightbox.close();
                }
            }
        });
    }

    // ------------ Обработка форм ------------
    const forms = document.querySelectorAll('form.contact-form, form.subscribe-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь был бы реальный код отправки формы
            // Но так как это статический лендинг, просто имитируем успех
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Имитация отправки
            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Спасибо! Ваше сообщение отправлено.';
                
                form.reset();
                form.appendChild(successMessage);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 500);
                }, 5000);
            }, 1500);
        });
    });

    // ------------ Активные пункты меню при скролле ------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}` || (current === '' && href === '#hero')) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ------------ Счетчики чисел ------------
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        let counted = false;
        
        function startCounting() {
            if (counted) return;
            
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                const speed = 200; // миллисекунд
                const duration = 2000; // миллисекунд для достижения целевого значения
                const increment = target / (duration / speed);
                
                let count = 0;
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCount, speed);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
            });
            
            counted = true;
        }
        
        // Проверяем, виден ли блок с счетчиками
        const counterSection = counters[0].closest('section');
        if (counterSection) {
            window.addEventListener('scroll', () => {
                const rect = counterSection.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.75);
                
                if (isVisible) {
                    startCounting();
                }
            });
            
            // Проверяем сразу после загрузки
            setTimeout(() => {
                const rect = counterSection.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.75);
                
                if (isVisible) {
                    startCounting();
                }
            }, 500);
        }
    }

    // ------------ Табы в About секции ------------
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.target;
                
                // Сбрасываем активные состояния
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Устанавливаем активные состояния
                button.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
}); 