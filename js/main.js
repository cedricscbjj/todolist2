import { initializeTaskManager } from './taskManager.js';
import { Personnage } from './personnage.js';

document.addEventListener('DOMContentLoaded', () => {
    let personnage = new Personnage();
    initializeTaskManager(personnage);
});