
document.addEventListener('DOMContentLoaded', () => {

    /* MENU MOBILE */

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {

        const toggleMenu = (forceClose = false) => {
            const isOpen = forceClose
                ? false
                : !navMenu.classList.contains('active');

            navMenu.classList.toggle('active', isOpen);

            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));

            mobileMenuBtn.setAttribute(
                'aria-label',
                isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
            );

            const icon = mobileMenuBtn.querySelector('i');

            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        };

        mobileMenuBtn.addEventListener('click', () => toggleMenu());

        navLinks.forEach((link) => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu(true);
                mobileMenuBtn.focus();
            }
        });
    }


    /* GITHUB API */

    const githubStatsContainer = document.getElementById('github-stats');

    if (githubStatsContainer) {

        const githubUsername = 'Maycon310-Dev';

        const loadGitHubStats = async () => {

            githubStatsContainer.setAttribute('aria-busy', 'true');

            githubStatsContainer.innerHTML =
                '<span class="tech-pill">Carregando dados do GitHub...</span>';

            try {

                const response = await fetch(
                    `https://api.github.com/users/${githubUsername}`
            );

                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.status}`);
                }

                const data = await response.json();

                const reposCount = Number(data.public_repos ?? 0);
                const followersCount = Number(data.followers ?? 0);

                githubStatsContainer.innerHTML = `
                    <span class="tech-pill">
                        <i class="fa-solid fa-folder-open" aria-hidden="true"></i>
                        ${reposCount}
                        ${reposCount === 1 ? 'Repositório Público' : 'Repositórios Públicos'}
                    </span>

                    <span class="tech-pill">
                        <i class="fa-solid fa-users" aria-hidden="true"></i>
                        ${followersCount}
                        ${followersCount === 1 ? 'Seguidor' : 'Seguidores'}
                    </span>
                `;

            } catch (error) {

                console.error('Erro ao carregar dados do GitHub:', error);

                githubStatsContainer.innerHTML =
                    '<span class="tech-pill">Não foi possível carregar os dados do GitHub.</span>';

            } finally {

                githubStatsContainer.setAttribute('aria-busy', 'false');

            }
        };

        loadGitHubStats();
    }

/* PROJETOS EM DESTAQUE */

const projectsContainer = document.getElementById('projects-container');

const featuredProjects = [
    {
        owner: 'Maycon310-Dev',
        repo: 'Comercial-ONE',
        description: 'Sistema de gestão comercial com funcionalidades de PDV e ERP.',
        technologies: 'C# • .NET • MySQL'
    },
    {
        owner: 'Maycon310-Dev',
        repo: 'sistema-gestao-hospitalar',
        description: 'Sistema web de gerenciamento hospitalar desenvolvido com Python e Flask.',
        technologies: 'Python • Flask • SQLite'
    }
];

const loadFeaturedProjects = async () => {

    if (!projectsContainer) return;

    try {

        const results = await Promise.all(
            featuredProjects.map(async (project) => {

                const response = await fetch(
                    `https://api.github.com/repos/${project.owner}/${project.repo}`
                );

                if (!response.ok) {
                    throw new Error(`Erro ao buscar ${project.repo}: ${response.status}`);
                }

                const data = await response.json();

                return {
                    ...project,
                    name: data.name,
                    language: data.language,
                    stars: data.stargazers_count,
                    url: data.html_url
                };
            })
        );

        projectsContainer.replaceChildren();

        results.forEach((project) => {

            const article = document.createElement('article');
            article.className = 'project-card';

            const content = document.createElement('div');
            content.className = 'project-card-content';

            const category = document.createElement('span');
            category.className = 'project-category';
            category.textContent = 'PROJETO EM DESTAQUE';

            const title = document.createElement('h3');
            title.textContent = project.name;

            const description = document.createElement('p');
            description.textContent = project.description;

            const technologies = document.createElement('div');
            technologies.className = 'project-technologies';

            const techLabel = document.createElement('span');
            techLabel.textContent = project.technologies;

            technologies.appendChild(techLabel);

            const footer = document.createElement('div');
            footer.className = 'project-footer';

            const language = document.createElement('span');
            language.textContent = project.language || 'Linguagem não informada';

            const stars = document.createElement('span');
            stars.textContent = `★ ${project.stars}`;

            const link = document.createElement('a');
            link.href = project.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'Ver projeto →';

            footer.append(language, stars, link);

            content.append(
                category,
                title,
                description,
                technologies,
                footer
            );

            article.appendChild(content);
            projectsContainer.appendChild(article);
        });

    } catch (error) {

        console.error('Erro ao carregar projetos:', error);

        projectsContainer.textContent =
            'Não foi possível carregar os projetos. Tente novamente mais tarde.';

    } finally {

        projectsContainer.setAttribute('aria-busy', 'false');

    }
};

loadFeaturedProjects();


});
