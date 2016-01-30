mocha.setup('bdd');
var expect = chai.expect;

function Todo(title, text, completed) {
  this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  this.title = title;
  this.text = text;
  this.completed = completed;
}

function findTodo(todos, todo) {
  return todos.find(function(t) {
    return t.id === todo.id;
  }, null, null);
}

function addTodo(todos, todo) {
  return todos.set(todo.id, todo);
}

describe('Querying an Immutable.js Map()', function() {

  it('should properly report keys', function() {

    var todo = new Todo("Todo 1", "I'm a todo!", false);

    var todos = Immutable.Map();
    todos = addTodo(todos, todo);

    expect(todos.get(todo.id)).to.equal(todo);
    expect(todos.has(todo.id)).to.equal(true);
    expect(todos.has("unknown key")).to.equal(false);

  });

  it('should properly report included values', function() {

    var todo1 = new Todo("Todo 1", "I'm a todo!", false);
    var todo2 = new Todo("Todo 1", "I'm a todo!", false);

    var todos = Immutable.Map();
    todos = addTodo(todos, todo1);

    expect(todos.includes(todo1)).to.equal(true);
    expect(todos.includes(todo2)).to.equal(false);

  });

  it('should find nested keys', function() {

    var todos1 = Immutable.Map();
    var todos2 = Immutable.Map();

    _.each(_.range(10), function(index) {
      todos = addTodo(todos1, new Todo("Todo" + index, "I'm a todo!", false));
    });

    _.each(_.range(10), function(index){
      todos1 = addTodo(todos2, new Todo("Todo" + index, "I'm a todo!", false));
    });

    var multipleTodoStates = Immutable.Map({
      "todo1": todos1,
      "todo2": todos2
    });

    var todoID = todos1.first().id;

    expect(multipleTodoStates.getIn(["todo1", todoID], null)).to.equal(todos1.first());


  });

  it('should find todo', function() {

    var todo1 = new Todo("Todo 1", "I'm a todo!", false);
    var todo2 = new Todo("Todo 2", "I'm a todo!", false);

    var todos = Immutable.Map();
    todos = addTodo(todos, todo1);
    todos = addTodo(todos, todo2);

    expect(findTodo(todos, todo1)).to.equal(todo1);

  });



});

mocha.run();
