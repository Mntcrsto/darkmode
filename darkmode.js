document.addEventListener("DOMContentLoaded", function() {
  // Création du bouton "Dark Mode"
  var button = document.createElement('button');
  button.id = 'toggle-dark-mode';
  button.innerText = 'Dark Mode';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '10000';
  document.body.appendChild(button);

  // Création de l'overlay
  var overlay = document.createElement('div');
  overlay.id = 'overlay';
  document.body.appendChild(overlay);

  // Ajout du CSS
  var css = `
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle 150px at var(--x) var(--y), transparent, black 160px);
    background-repeat: no-repeat;
    transition: all 0.5s ease;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
  }

  #toggle-dark-mode {
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #toggle-dark-mode:hover {
    background-color: #444;
  }

  body.dark-mode #toggle-dark-mode {
    background-color: #fff;
    color: #000;
  }

  body.dark-mode #overlay {
    opacity: 1;
  }`;

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  if (style.styleSheet){
    // IE support
    style.styleSheet.cssText = css;
  } else {
    // Default support
    style.appendChild(document.createTextNode(css));
  }

  // Ajout des handlers d'événement
  button.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains('dark-mode')) {
      button.innerText = 'Light Mode';
    } else {
      button.innerText = 'Dark Mode';
    }
  });

  document.addEventListener("mousemove", function(e) {
    overlay.style.setProperty('--x', e.clientX + 'px');
    overlay.style.setProperty('--y', e.clientY + 'px');
  });

  // Ajout de la prise en charge des événements tactiles
  document.addEventListener("touchmove", function(e) {
    overlay.style.setProperty('--x', e.touches[0].clientX + 'px');
    overlay.style.setProperty('--y', e.touches[0].clientY + 'px');
  });
});
