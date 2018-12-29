import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };

    this.items.push(item);

    // save item in localStorage
    this.saveList();

    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    // [2, 4, 8] splice(1, 2) -> returns [4, 8] original array is [2]
    // [2, 4, 8] slice(1, 2) -> returns 4, original array is [2, 4, 8]
    this.items.splice(index, 1);

    this.saveList();
  }

  emptyList() {
    this.items = [];

    this.saveList();
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }

  saveList() {
    localStorage.setItem('shopping', JSON.stringify(this.items));
  }

  retrieveStorage() {
    const storage = JSON.parse(localStorage.getItem('shopping'));
    if (storage) this.items = storage;
  }
}
