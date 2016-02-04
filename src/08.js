mocha.setup('bdd');
const expect = chai.expect;

class Todo {

  constructor(title="", items=Immutable.List(), completed=false) {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.title = title;
    this.items = items;
    this.completed = completed;
  }

}

function addTodoToMap(todos, todo) {
  return todos.set(todo.id, todo);
}

function addTodoToList(todos, todo) {
  return todos.push(todo);
}


describe('Differences between the Immutable.js Map() and List()', () => {

  it('should find same todo in List() and Map()', () => {

    const todo = new Todo("Todo 1");

    let todosMap = Immutable.Map();
    todosMap = addTodoToMap(todosMap, todo);

    let todosList = Immutable.List();
    todosList = addTodoToList(todosList, todo);

    expect(todosMap.get(todo.id)).to.equal(todo);
    expect(todosList.get(0)).to.equal(todo);

  });

  it('should create List() from series of values', () => {

    const todoItems = ["Milk", "Eggs", "Detergent", "Bread", "Steak"];
    const list = Immutable.List.of("Milk", "Eggs", "Detergent", "Bread", "Steak");

    var count = 0;
    _.each(todoItems, (item) => {
      expect(list.get(count)).to.equal(item);
      count++;
    })

  });

  it('should create List() from array using the rest operator', () => {

    const todoItems = ["Milk", "Eggs", "Detergent", "Bread", "Steak"];
    const list = Immutable.List.of(...todoItems);

    var count = 0;
    _.each(todoItems, (item) => {
      expect(list.get(count)).to.equal(item);
      count++;
    })

  });

  it('should remove last element from List()', () => {

    const todoItems = ["Milk", "Eggs", "Detergent", "Bread", "Steak"];
    let list = Immutable.List.of(...todoItems);

    list = list.pop(); // Just like Array

    var count = 0;
    _.each(todoItems, (item) => {
      if (count < 4)
        expect(list.get(count)).to.equal(item);
      else
        expect(list.get(count)).to.not.equal(item);

      count++;
    })

  });

});

mocha.run();
