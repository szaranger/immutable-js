mocha.setup('bdd');
var expect = chai.expect;

var Todo = function(title, text, completed) {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.title = title;
    this.text = text;
    this.completed = completed;
};

function addTodo(todos, todo) {
  return todos.set(todo.id, todo);
}

function removeTodo(todos, todo) {
  return todos.delete(todo.id, todo);
}

function updateTodo(todos, todo) {
  return todos.update(todo.id, function(todo) { return todo; });
}

function mergeTodos(todos, todos2) {
  return todos.merge(todos2);
}

function clearAll(todos) {
  return todos.clear();
}

describe('Modifying an Immutable.js Map()', function() {

  it('should add todo to state', function() {

    var todo = new Todo("Todo 1", "I'm a todo!", false);

    var todos = Immutable.Map();
    todos = addTodo(todos, todo);

    expect(todos.get(todo.id)).to.equal(todo);

  });

  it('should remove todo from state', function() {

    var todo = new Todo("Todo 1", "I'm a todo!", false);

    var todos = Immutable.Map();
    todos = addTodo(todos, todo);

    expect(todos.get(todo.id)).to.equal(todo);

    todos = removeTodo(todos, todo);
    expect(todos.get(todo.id)).to.be.undefined;

  });

  it('should update todo', function() {

    var todo = new Todo("Todo 1", "I'm a todo!", false);

    var todos = Immutable.Map();
    todos = addTodo(todos, todo);

    todo.title = "New Title";

    todos = updateTodo(todos, todo);
    expect(todos.get(todo.id).title).to.equal("New Title");

  });

  it('should remove all todos', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index) {
      todos = addTodo(todos, new Todo("Todo " + index, "I'm a todo!", false));
    });

    expect(todos.size).to.equal(10);

    todos = clearAll(todos);
    expect(todos.size).to.equal(0);

  });

  it('should merge todos', function() {

    var todos = Immutable.Map();
    var todos2 = Immutable.Map();

    _.each(_.range(10), function(index) {
      todos = addTodo(todos, new Todo("Todo " + index, "I'm a todo!", false));
    });

    _.each(_.range(10), function(index) {
      todos2 = addTodo(todos2, new Todo("Todo " + index, "I'm a todo!", false));
    });

    todos = mergeTodos(todos, todos2);
    expect(todos.size).to.equal(20);

  });

});

mocha.run();
