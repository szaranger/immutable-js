mocha.setup('bdd');
var expect = chai.expect;

function Todo(title, text, completed) {
  this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  this.title = title;
  this.text = text;
  this.completed = completed;
}

function getTodoTexts(todos) {
  return todos.map(function(todo) {
    return todo.text;
  });
}

function markAllTodosAsComplete(todos) {
  return todos.forEach(function(todo) {
    todo.completed = true;
  });
}

function getCompletedTodos(todos) {
  return todos.filter(function(todo) {
    return todo.completed;
  });
}

function groupTodosByCompleted(todos) {
  return todos.groupBy(function(todo) {
    return todo.completed;
  });
}

function addTodo(todos, todo) {
  return todos.set(todo.id, todo);
}

describe('Iterating over an Immutable.js Map()', function() {

  it('should convert all todos into a map() of titles', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index) {
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", false));
    });

    var todoTexts = getTodoTexts(todos);

    expect(todoTexts.first()).to.equal("I'm a todo!");

  });

  it('should filter todos', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index) {
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", index % 2 === 0));
    });

    filteredTodos = getCompletedTodos(todos);

    expect(filteredTodos.size).to.equal(5);

  });

  it('should mark all todos completed', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index) {
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", false));
    });

    // This has the chance for side effects
    markAllTodosAsComplete(todos);

    _.each(todos.toArray(), function(todo) {
      expect(todo.completed).to.be.true;
    });

  });

  it('should group todos by completed boolean', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index) {
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", index % 2 === 0));
    });

    groupedTodos = groupTodosByCompleted(todos);

    expect(groupedTodos.get(true).size).to.equal(5);
    expect(groupedTodos.get(false).size).to.equal(5);

  });

});

mocha.run();
