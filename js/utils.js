

export function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#list-container li').forEach(item => {
        tasks.push({
            description: item.querySelector('strong').textContent,
            category: item.dataset.category,
            points: item.dataset.points,
            backgroundColor: item.style.backgroundColor
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromLocalStorage(personnage) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${task.description}</strong> - ${task.category} - Points: ${task.points} <button class="delete-task btn btn-danger btn-sm">Supprimer</button>`;
        listItem.dataset.points = task.points;
        listItem.dataset.category = task.category;
        listItem.style.backgroundColor = task.backgroundColor;

        document.getElementById('list-container').appendChild(listItem);

        listItem.querySelector('.delete-task').addEventListener('click', function() {
            const pointsToRemove = parseInt(listItem.dataset.points, 10);
            const categoryToRemove = listItem.dataset.category;
            listItem.remove();
            updatePersonnagePoints(personnage, categoryToRemove, -pointsToRemove);
            saveTasksToLocalStorage();
        });

        updatePersonnagePoints(personnage, task.category, parseInt(task.points, 10));
    });
}

function updatePersonnagePoints(personnage, category, points) {
    if (category === 'tachesmenageres') {
        personnage.incrementerSante(points);
    } else if (category === 'tachesadmin') {
        personnage.incrementerMoney(points);
    } else if (category === 'devperso') {
        personnage.incrementerIntelligence(points);
    }
    personnage.mettreAJourTotal();
}
