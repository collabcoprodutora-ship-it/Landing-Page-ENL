document.addEventListener('DOMContentLoaded', () => {
    // --- Countdown Timer Logic ---
    // Set the date we're counting down to: Feb 13, 2026 00:00:00
    const countDownDate = new Date("Feb 13, 2026 00:00:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Helper to update timer elements by suffix
        const updateTimerDisplay = (suffix) => {
            const daysEl = document.getElementById("days" + suffix);
            const hoursEl = document.getElementById("hours" + suffix);
            const minutesEl = document.getElementById("minutes" + suffix);
            const secondsEl = document.getElementById("seconds" + suffix);

            if (daysEl && hoursEl && minutesEl && secondsEl) {
                daysEl.innerHTML = days < 10 ? "0" + days : days;
                hoursEl.innerHTML = hours < 10 ? "0" + hours : hours;
                minutesEl.innerHTML = minutes < 10 ? "0" + minutes : minutes;
                secondsEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
            }
        };

        // Update Desktop Timer (IDs: days, hours...)
        updateTimerDisplay("");
        // Update Mobile Banner Timer (IDs: days-banner, hours-banner...)
        updateTimerDisplay("-banner");

        if (distance < 0) {
            clearInterval(x);
             const resetTimerDisplay = (suffix) => {
                const daysEl = document.getElementById("days" + suffix);
                const hoursEl = document.getElementById("hours" + suffix);
                const minutesEl = document.getElementById("minutes" + suffix);
                const secondsEl = document.getElementById("seconds" + suffix);
                 if (daysEl && hoursEl && minutesEl && secondsEl) {
                    daysEl.innerHTML = "00";
                    hoursEl.innerHTML = "00";
                    minutesEl.innerHTML = "00";
                    secondsEl.innerHTML = "00";
                }
            };
            resetTimerDisplay("");
            resetTimerDisplay("-banner");
            
            const label = document.querySelector('.countdown-text');
            if (label) label.innerText = "INSCRIÇÕES ENCERRADAS";
        }
    }, 1000);

    // --- Number Counter Animation ---
    const counters = document.querySelectorAll('.authority-number');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower increment for higher precision on small numbers, higher for large numbers
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Use Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe the container of the counters
    const statsSection = document.querySelector('.bio-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});
