// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Gallery Modal Functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.modal-close');

    if (galleryItems.length > 0 && modal) {
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalCaption.textContent = this.alt;
            });
        });

        // Close modal functionality
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        // Close modal when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const checkin = formData.get('checkin');
            const checkout = formData.get('checkout');
            const guests = formData.get('guests');
            const chalet = formData.get('chalet');
            const message = formData.get('message');

            // Validate required fields
            if (!name || !email || !phone || !checkin || !checkout) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }

            // Validate dates
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (checkinDate < today) {
                alert('تاريخ الوصول يجب أن يكون اليوم أو في المستقبل');
                return;
            }

            if (checkoutDate <= checkinDate) {
                alert('تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول');
                return;
            }

            // Get chalet type in Arabic
            let chaletType;
            switch(chalet) {
                case 'both':
                    chaletType = 'كلا الشاليهين';
                    break;
                case 'chalet1':
                    chaletType = 'الشاليه الأول';
                    break;
                case 'chalet2':
                    chaletType = 'الشاليه الثاني';
                    break;
                default:
                    chaletType = chalet;
            }

            // Create email content
            const subject = 'حجز جديد - شاليه الجوهر';
            const body = `تفاصيل الحجز:

الاسم: ${name}
البريد الإلكتروني: ${email}
رقم الهاتف: ${phone}
تاريخ الوصول: ${checkin}
تاريخ المغادرة: ${checkout}
عدد الأشخاص: ${guests}
الشاليه المطلوب: ${chaletType}

رسالة إضافية:
${message || 'لا توجد ملاحظات إضافية'}

---
تم إرسال هذا الطلب من موقع شاليه الجوهر
التاريخ: ${new Date().toLocaleString('ar-SA')}`;

            // Open email client
            const mailtoLink = `mailto:nawafzwf25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            // Show success message
            alert('تم إرسال طلب الحجز! سيتم فتح برنامج البريد الإلكتروني لإرسال الطلب.');
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Validate required fields
            if (!name || !email || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }

            // Get subject in Arabic
            let subjectArabic;
            switch(subject) {
                case 'booking':
                    subjectArabic = 'استفسار عن الحجز';
                    break;
                case 'pricing':
                    subjectArabic = 'استفسار عن الأسعار';
                    break;
                case 'general':
                    subjectArabic = 'استفسار عام';
                    break;
                case 'complaint':
                    subjectArabic = 'شكوى أو اقتراح';
                    break;
                default:
                    subjectArabic = subject;
            }

            // Create email content
            const emailSubject = `${subjectArabic} - شاليه الجوهر`;
            const emailBody = `رسالة جديدة من موقع شاليه الجوهر:

الاسم: ${name}
البريد الإلكتروني: ${email}
الموضوع: ${subjectArabic}

الرسالة:
${message}

---
تم إرسال هذه الرسالة من موقع شاليه الجوهر
التاريخ: ${new Date().toLocaleString('ar-SA')}`;

            // Open email client
            const mailtoLink = `mailto:nawafzwf25@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;

            // Show success message
            alert('تم إرسال الرسالة! سيتم فتح برنامج البريد الإلكتروني لإرسال الرسالة.');
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .contact-card, .amenity-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Set minimum date for booking form
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);
        
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const nextDay = new Date(checkinDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
            
            // Clear checkout if it's before the new minimum
            if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
                checkoutInput.value = '';
            }
        });
    }

    // Add loading animation to buttons
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'جاري الإرسال...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// Add navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg',
        'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload function when page loads
window.addEventListener('load', preloadImages);

     // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
    
    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('تم استلام طلب الحجز بنجاح، سنتواصل معك قريباً لتأكيد التفاصيل.');
      bookingForm.reset();
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
 