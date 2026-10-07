/* anti-cadre.js : Astrolabe ne s'affiche jamais dans un cadre (ADR-103 §6), écrit le 07/10/2026 pour I0.
   GitHub Pages n'envoie aucun en-tête HTTP choisi par le site : ni X-Frame-Options, ni frame-ancestors (ignoré dans une
   balise meta). Ce script, servi par le site lui-même et chargé juste après la balise de sécurité et la balise
   no-referrer, masque toute la page si elle n'est pas la fenêtre principale (R6-09), avant que rien ne s'affiche.
   Aucune écriture de HTML, aucun style en ligne : l'attribut hidden suffit (règle [hidden] du navigateur, reprise
   par web/socle/composants.css). */
(function () {
  "use strict";
  var cadre;
  try {
    cadre = window.top !== window.self;
  } catch (e) {
    cadre = true; /* fenêtre parente d'une autre origine : lecture refusée, donc cadre */
  }
  if (cadre) {
    document.documentElement.hidden = true;
    document.documentElement.setAttribute("data-cadre", "refuse");
    if (typeof window.stop === "function") window.stop();
  }
})();
