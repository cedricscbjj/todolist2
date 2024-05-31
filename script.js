 document.addEventListener('DOMContentLoaded', initializeTaskManager);

        function initializeTaskManager() {
            const form = document.getElementById('task-form');
            const listContainer = document.getElementById('list-container');
            const createButton = document.getElementById('create-task');
            const totalPointsDisplay = document.getElementById('totalpoints');
            const messageboard = document.getElementById('messageboard');
            let totalPoints = 0;

            createButton.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default button behavior

                const description = document.getElementById('description').value;
                const categorySelect = document.getElementById('category');
                const category = categorySelect.value;
                const selectedOption = categorySelect.options[categorySelect.selectedIndex];
                const points = parseInt(selectedOption.getAttribute('data-value'), 10);

                // Create list item
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${description}</strong> - ${category} - Points: ${points}  <button class="delete-task btn btn-danger btn-sm">Supprimer</button>     `;

                // Append list item to list container
                listContainer.appendChild(listItem);

                // Update total points
                totalPoints += points;
                totalPointsDisplay.textContent = ` ${totalPoints}`;
                checkPoints(totalPoints);


                listItem.querySelector('.delete-task').addEventListener('click', function() {
                listContainer.removeChild(listItem);
                totalPoints -= points;
                totalPointsDisplay.textContent = ` ${totalPoints}`;
                checkPoints(totalPoints);
            });

                if (description === "" || category === "") {
                alert("Veuillez remplir tous les champs !");

                return;
            }





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

    
                // Clear form inputs
                form.reset();


            });
        };

        function checkPoints(totalPoints) {
            if (totalPoints > 150) {
                console.log("gros brodel en vue");
            } else if (totalPoints > 100) {
                console.log("ca commence a monter");
            } else if (totalPoints > 50) {
                console.log("aie aie aie");
                messageboard.innerHTML = "ca sent le roussi"
            }
            else if (totalPoints > 1) {
                console.log("yeah");
                messageboard.innerHTML = " lets go!!!!"
            }
        }
