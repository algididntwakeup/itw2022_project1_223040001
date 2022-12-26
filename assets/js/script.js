let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('open');
};

const sr = ScrollReveal({
  distance: '65px',
  duration: 1500,
  delay: 250,
  reset: true,
});
// scroll buat heronya ini
sr.reveal('.hero-text', { delay: 200, origin: 'top' });
sr.reveal('.hero-img', { delay: 450, origin: 'top' });
sr.reveal('.icons', { delay: 500, origin: 'left' });
sr.reveal('.scroll-down', { delay: 500, origin: 'right' });

// ini buat yg abot
sr.reveal('.tentang-text', { delay: 400, origin: 'top' });
sr.reveal('.tentang-img', { delay: 400, origin: 'left' });
sr.reveal('.education-container', { delay: 100, origin: 'top' });

// buat skills
sr.reveal('.main-text', { delay: 400, origin: 'top' });
sr.reveal('.skills-content', { delay: 400, origin: 'bottom' });

// proyek
sr.reveal('.main-text', { delay: 200, origin: 'top' });
sr.reveal('.portfolio-container', { delay: 300, origin: 'bottom' });

// kontak jg?
sr.reveal('.contact-text', { delay: 200, origin: 'left' });
sr.reveal('.contact-form', { delay: 200, origin: 'right' });

const header = document.querySelector('header');
window.addEventListener('scroll', function () {
  header.classList.toggle('sticky', window.scrollY > 500);
});

// scramblerr
const resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    }

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === 'function') {
          callback();
        }
      }, options.timeout);
    }

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, { partialString: partialString });

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === 'function') {
          callback();
        }
      });
    }

    doResolverEffect(combinedOptions, callback);
  },
};

/* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
 * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
 */
const strings = ['Muhammad Al Ghifari'];

let counter = 0;

const options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 5,
  // Number of random characters to show
  iterations: 10,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]'),
};

// Callback function when resolve completes
function callback() {
  setTimeout(() => {
    counter++;

    if (counter >= strings.length) {
      counter = 0;
    }

    let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
    resolver.resolve(nextOptions, callback);
  }, 7000);
}

resolver.resolve(options, callback);
