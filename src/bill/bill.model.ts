export class Bill {
  readonly participants: string[];
  readonly items: Item[];
  readonly payments: Payment[];
}

class Item {
  readonly name: string;
  readonly price: number;
  readonly payers: string[];
}

class Payment {
  readonly id: string;
  readonly amount: number;
}
