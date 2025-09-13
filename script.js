// Page navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    navLinks.forEach(nav => nav.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));

    link.classList.add('active');
    const targetPage = link.getAttribute('href').substring(1);
    document.getElementById(targetPage).classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const mailtoLink = `mailto:saikumaranairforce@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}
Email: ${email}

Message:
${message}`)}`;
  window.location.href = mailtoLink;

  alert('Your email client should open now. If not, please send your query directly to saikumaranairforce@gmail.com');
  this.reset();
});

// Add scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});
