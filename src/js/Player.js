export class Player {
  canDraw = true;
  lost = false;

  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  getHandValue() {
    if (this.hand.length === 0) return 0;

    const baseValue = this.hand.map(c => c.value).reduce((a,b) => a+b, 0);
    const aceQuantity = this.hand.filter(card => card.name.includes("A")).length;

    return baseValue > 21 && aceQuantity >= 1
      ? baseValue - 10 * aceQuantity
      : baseValue;
  }

  didLost() {
    return this.getHandValue() > 21;
  }

  showCards() {
    return this.hand.map(card => card.name).join(", ");
  }
}
