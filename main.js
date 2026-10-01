async function loadProjects() {
    const response = await fetch('projects.json');
    return response.json();
}

function createProjectCard(project) {
    return `
        <article class="projet-carre">
            <img class="projet-image" src="${project.image}" alt="Image du projet ${project.title}">
            <div class="projet-contenu">
                <p class="projet-date">Posté ${project.year}</p>
                <h3>${project.title}</h3>
                <p class="projet-description">${project.description}</p>
                <ul class="projet-competences" aria-label="Compétences utilisées">
                    ${project.skills.map((skill) => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        </article>`;
}

async function init() {
    const grid = document.querySelector('.projets-carres');
    const projects = await loadProjects();
    grid.innerHTML = projects.map(createProjectCard).join('');
}

init();