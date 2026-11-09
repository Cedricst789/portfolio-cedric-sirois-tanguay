//Pour charger les projets depuis le fichier JSON
async function loadProjects() {
    const response = await fetch('projects.json');
    return response.json();
}
//Pour créer le HTML pour chaque projet
function createProjectCard(project) {
    return `
        <article class="projet-carre projet-${project.id}">
            <img class="projet-image" src="${project.image}" alt="Image du projet ${project.title}">
            <div class="projet-contenu">
                <p class="projet-date">Posté ${project.year}</p>
                <h3>${project.title}</h3>
                <p class="projet-description${project.expandedDescription ? ' projet-description-courte' : ''}">${project.description}</p>
                ${project.expandedDescription ? `<p class="projet-description projet-description-longue">${project.expandedDescription}</p>` : ''}
                <span class="projet-indicateur" aria-hidden="true"></span>
                <!-- Pour les href des bouttons -->
                <p class="projet-lien${project.id === 'mysto' ? ' projet-lien-processus' : ''}">
                    ${project.link ? `<a class="bouton projet-lien" href="${project.link}" target="_blank" rel="noopener noreferrer">Voir le projet</a>` : ''}
                    ${project.id === 'mysto' ? '<button class="bouton bouton-processus" type="button" aria-haspopup="dialog" aria-controls="fenetre-processus">Processus créatif</button>' : ''}
                </p>
                <ul class="projet-competences" aria-label="Compétences utilisées">
                    ${project.skills.map((skill) => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        </article>`;
}

// Faire entrer les projets depuis les quatre coins lorsqu'ils apparaissent à l'écran.
function observeProjectCards(grid) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        grid.classList.add('projets-visible');
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('projets-visible');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.18
    });

    observer.observe(grid);
}

// Révéler les compétences lorsque leur liste entre dans la fenêtre.
function observeCompetences() {
    const list = document.querySelector('.competences-liste');

    if (!list) {
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        list.classList.add('competences-visibles');
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('competences-visibles');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.2
    });

    observer.observe(list);
}

// Faire apparaître la phrase de personnalité comme si elle était écrite.
function observePersonnalite() {
    const phrase = document.querySelector('.personnalite-phrase');

    if (!phrase) {
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        phrase.classList.add('personnalite-visible');
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('personnalite-visible');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.35
    });

    observer.observe(phrase);
}

// Révéler la section contact comme une connexion lumineuse.
function observeContact() {
    const contact = document.querySelector('.contact');

    if (!contact) {
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        contact.classList.add('contact-visible');
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('contact-visible');
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.25
    });

    observer.observe(contact);
}

// Ouvrir et fermer la fenêtre du processus créatif.
function initProcessusCreatif() {
    const openButton = document.querySelector('.bouton-processus');
    const dialog = document.querySelector('#fenetre-processus');
    const closeButton = dialog ? dialog.querySelector('.processus-fermer') : null;

    if (!openButton || !dialog || !closeButton) {
        return;
    }

    const closeDialog = () => {
        dialog.hidden = true;
        openButton.focus();
    };

    openButton.addEventListener('click', () => {
        dialog.hidden = false;
        closeButton.focus();
    });

    closeButton.addEventListener('click', closeDialog);

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            closeDialog();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !dialog.hidden) {
            closeDialog();
        }
    });
}

//Pour afficher les projets
async function init() {
    const grid = document.querySelector('.projets-carres');
    const projects = await loadProjects();
    grid.innerHTML = projects.map(createProjectCard).join('');
    observeProjectCards(grid);
    observeCompetences();
    observePersonnalite();
    observeContact();
    initProcessusCreatif();
}

// Faire fonctionner le menu hamburger
const menuButton = document.querySelector('.menu-bouton');
const navigation = document.querySelector('#navigation-principale');

menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('menu-ouvert');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navigation.classList.remove('menu-ouvert');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Ouvrir le menu');
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        navigation.classList.remove('menu-ouvert');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Ouvrir le menu');
    }
});

init();