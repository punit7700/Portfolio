
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, header.hero');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('show'); }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            links.forEach(l => l.classList.remove('active'));
            const active = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));