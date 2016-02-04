mocha.setup('bdd');
var expect = chai.expect;

function Todo (title, items, completed) {
  this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  this.title = title;
  this.items = items;
  this.completed = completed;
}

function addTodoToMap(todos, todo) {
  return todos.set(todo.id, todo);
}

function addTodoToList(todos, todo) {
  return todos.push(todo);
}


describe('Differences between the Immutable.js Map() and List()', function() {

  it('should find same todo in List() and Map()', function() {

    var todo = new Todo("Todo 1");

    var todosMap = Immutable.Map();
    todosMap = addTodoToMap(todosMap, todo);

    var todosList = Immutable.List();
    todosList = addTodoToList(todosList, todo);

    expect(todosMap.get(todo.id)).to.equal(todo);
    expect(todosList.get(0)).to.equal(todo);

  });

  it('should create List() from series of values', function() {

    var todoItems = ["Milk", "Eggs", "Detergent", "Bread", "Steak"];
    var list = Immutable.List.of("Milk", "Eggs", "Detergent", "Bread", "Steak");

    var count = 0;
    _.each(todoItems, function(item)  {
      expect(list.get(count)).to.equal(item);
      count++;
    });

  });


  it('should remove last element from List()', function() {

    var todoItems = ["Milk", "Eggs", "Detergent", "Bread", "Steak"];
    var list = Immutable.List(todoItems);

    list = list.pop(); // Just like Array

    var count = 0;
    _.each(todoItems, function(item) {
      if (count < 4)
        expect(list.get(count)).to.equal(item);
      else
        expect(list.get(count)).to.not.equal(item);

      count++;
    });

  });

});

mocha.run();
