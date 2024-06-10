

import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from './utils.js';

export function initializeTaskManager(personnage) {
    const form = document.getElementById('task-form');
    const listContainer = document.getElementById('list-container');
    const createButton = document.getElementById('create-task');
    const messageboard = document.getElementById('messageboard');

    // Load tasks from localStorage on page load
    loadTasksFromLocalStorage(personnage);

    createButton.addEventListener('click', function(event) {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const categorySelect = document.getElementById('category');
        const category = categorySelect.value;
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        const points = parseInt(selectedOption.getAttribute('data-value'), 10);

        if (description === "" || category === "") {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${description}</strong> - ${selectedOption.textContent} - Points: ${points} <button class="delete-task btn btn-danger btn-sm">Supprimer</button>`;
        listItem.dataset.points = points;
        listItem.dataset.category = category;

        // Change background color based on category
        switch (category) {
            case 'tachesmenageres':
                listItem.style.backgroundColor = '#F5B7B1';
                break;
            case 'tachesadmin':
                listItem.style.backgroundColor = '#FAD7A0';
                break;
            case 'devperso':
                listItem.style.backgroundColor = '#D4E6F1';
                break;
            default:
                listItem.style.backgroundColor = '#f0f0f0';
        }

        listContainer.appendChild(listItem);

        updatePersonnagePoints(personnage, category, points);
        saveTasksToLocalStorage();

        listItem.querySelector('.delete-task').addEventListener('click', function() {
            const pointsToRemove = parseInt(listItem.dataset.points, 10);
            const categoryToRemove = listItem.dataset.category;
            listItem.remove();
            updatePersonnagePoints(personnage, categoryToRemove, -pointsToRemove);
            saveTasksToLocalStorage();
        });
    });

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
}
