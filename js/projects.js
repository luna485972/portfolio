const wrapper = document.querySelector('.wrapper');
const nav = document.querySelector('.site-nav');

const mobileQuery = window.matchMedia('(max-width: 900px)');


// ---------- Nav scroll state ----------

if (wrapper && nav) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('is-scrolled', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(wrapper);
}


// ---------- Custom triangle cursor + click-through ----------

const cursor = document.querySelector('.custom-cursor');

if (
  wrapper &&
  cursor &&
  wrapper.dataset.link &&
  !mobileQuery.matches
) {

  const link = wrapper.dataset.link;

  wrapper.addEventListener('mousemove', (e) => {
    cursor.style.transform =
      `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

    cursor.classList.add('is-visible');
  });

  wrapper.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
  });

  wrapper.addEventListener('click', (e) => {

    if (e.target.closest('button, a')) return;

    window.open(link, '_blank', 'noopener');
  });
}


// ---------- Sticky text fade + per-paragraph highlight ----------

const fadeZone = document.querySelector('.fade-zone');
const contentDescription = document.querySelector('.content-description');
const contentImages = document.querySelector('.content-images');
const descParas = contentDescription
  ? contentDescription.querySelectorAll('.desc-para')
  : [];

if (fadeZone && contentDescription) {

  // MOBILE:
  // disable animation completely, show every paragraph at once
  if (mobileQuery.matches) {

    contentDescription.classList.add('is-visible');
    contentDescription.classList.remove('is-hidden');
    descParas.forEach((p) => p.classList.add('is-active'));

  } else {

    // DESKTOP:
    // keep observer animation for the whole block
    const descObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            contentDescription.classList.add('is-visible');
            contentDescription.classList.remove('is-hidden');

          } else {
            contentDescription.classList.remove('is-visible');
            contentDescription.classList.add('is-hidden');
          }

        });

      },
      { threshold: 0 }
    );

    descObserver.observe(fadeZone);

    // Crossfade between paragraphs as the user scrolls through the
    // photo column. The image column is split into N equal stretches
    // (N = number of paragraphs) and whichever stretch is currently
    // passing gets its paragraph highlighted.
    if (contentImages && descParas.length > 1) {

      let ticking = false;

      const updateActiveParagraph = () => {
        const rect = contentImages.getBoundingClientRect();
        const total = rect.height - window.innerHeight;

        if (total > 0) {
          const scrolled = Math.min(Math.max(-rect.top, 0), total);
          const progress = scrolled / total;
          const index = Math.min(
            descParas.length - 1,
            Math.floor(progress * descParas.length)
          );

          descParas.forEach((p, i) => {
            p.classList.toggle('is-active', i === index);
          });
        }

        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateActiveParagraph);
          ticking = true;
        }
      }, { passive: true });

      updateActiveParagraph();

    } else if (descParas.length === 1) {
      // Single-paragraph pages: nothing to switch between, just show it.
      descParas[0].classList.add('is-active');
    }
  }
}


//preview 

const iframe = document.querySelector('.wrapper iframe'); 
if (iframe && wrapper) { 
  iframe.addEventListener('load', 
    () => { 
      wrapper.classList.add('is-loaded'); 
    }); 
  }