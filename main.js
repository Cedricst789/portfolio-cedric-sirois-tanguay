//Pour charger les projets depuis le fichier JSON
async function loadProjects() {
    const response = await fetch('projects.json');
    return response.json();
}
//Pour créer le HTML pour chaque projet
function createProjectCard(project) {
    return `
        <article class="projet-carre">
            <img class="projet-image" src="${project.image}" alt="Image du projet ${project.title}">
            <div class="projet-contenu">
                <p class="projet-date">Posté ${project.year}</p>
                <h3>${project.title}</h3>
                <p class="projet-description">${project.description}</p>
                <!-- Pour les href des bouttons -->
                <p class="projet-lien">
                    ${project.link ? `<a class="bouton projet-lien" href="${project.link}" target="_blank" rel="noopener noreferrer">En savoir plus</a>` : ''}
                </p>
                <ul class="projet-competences" aria-label="Compétences utilisées">
                    ${project.skills.map((skill) => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        </article>`;
}
//Pour afficher les projets
async function init() {
    const grid = document.querySelector('.projets-carres');
    const projects = await loadProjects();
    grid.innerHTML = projects.map(createProjectCard).join('');
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