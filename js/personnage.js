

export class Personnage {
    constructor() {
        this.pointsMoney = 0;
        this.pointsIntelligence = 0;
        this.pointsSante = 0;
        this.moneyElement = document.getElementById("money");
        this.intelligenceElement = document.getElementById("intelligence");
        this.santeElement = document.getElementById("sante");
        this.totalPointElement = document.getElementById("totalpoint");

        this.updateDOM();
    }

    incrementerMoney(points) {
        this.pointsMoney += points;
        this.updateDOM();
    }

    incrementerIntelligence(points) {
        this.pointsIntelligence += points;
        this.updateDOM();
    }

    incrementerSante(points) {
        this.pointsSante += points;
        this.updateDOM();
    }

    mettreAJourTotal() {
        const total = this.pointsMoney + this.pointsIntelligence + this.pointsSante;
        this.totalPointElement.textContent = total.toString();
    }

    updateDOM() {
        this.moneyElement.textContent = this.pointsMoney.toString();
        this.intelligenceElement.textContent = this.pointsIntelligence.toString();
        this.santeElement.textContent = this.pointsSante.toString();
        this.mettreAJourTotal();
    }
}
