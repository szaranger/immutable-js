mocha.setup('bdd');
var expect = chai.expect;

function Todo(title, text , completed) {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.title = title;
    this.text = text;
    this.completed = completed;
}

function addTodo(todos, todo) {
  return todos.set(todo.id, todo);
}

function retrieveFinalPair(todos) {
  return todos.slice(todos.size-2, todos.size);
  // Alernatively, you can use this terser syntax
  //return todos.slice(-2);
}

function removeLastEntry(todos) {
  return todos.slice(0, -1);
}

function removeFirstEntry(todos) {
  return todos.slice(1, todos.size);
}

function removeFirstFive(todos) {
  return todos.skip(5);
}

function findMeMonkey(todos) {
  return todos.skipUntil(function(todo) { return todo.text === "monkey"; });
}

function stopAtMonkey(todos) {
  return todos.skipWhile(function(todo) { return todo.text === "monkey"; });
}

describe('Working with Subsets of an Immutable.js Map()', function() {

  it('should retrieve last two entries using slice()', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index){
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", false));
    });

    var lastTwoTodos = retrieveFinalPair(todos);

    expect(lastTwoTodos.size).to.equal(2);

    todos.takeLast(2).forEach(function(todo) {
      expect(lastTwoTodos.get(todo.id)).to.equal(todo);
    });

  });

  it('should remove last entry using negative slice()', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index){
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", false));
    });

    var todosWithoutLast = removeLastEntry(todos);

    todos.butLast().forEach(function(todo) {
      expect(todosWithoutLast.get(todo.id)).to.equal(todo);
    });

  });

  it('should remove first entry using slice()', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index){
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", false));
    });

    var todosWithoutFirst = removeFirstEntry(todos);

    todos.rest().forEach(function(todo) {
      expect(todosWithoutFirst.get(todo.id)).to.equal(todo);
    });

  });

  it('should return last 5 todos using skip()', function() {

    var todos = Immutable.Map();

    _.each(_.range(10), function(index){
      todos = addTodo(todos, new Todo("Todo" + index, "I'm a todo!", false));
    });

    var lastFive = removeFirstFive(todos);

    todos.takeLast(5).forEach(function(todo) {
      expect(lastFive.get(todo.id)).to.equal(todo);
    });

  });

  it('should return todos after reaching \"monkey\" using skipUntil()', function() {

    var texts = ["dog", "cat", "frog", "monkey", "octopus", "horse", "orangutan"];
    var todos = Immutable.Map();

    _.each(_.range(texts.length), function(index){
      todos = addTodo(todos, new Todo("Todo" + index, texts[index], false));
    });

    var monkeyAndAfter = findMeMonkey(todos);

    todos.takeLast(4).forEach(function(todo) {
      expect(monkeyAndAfter.get(todo.id)).to.equal(todo);
    });

  });

  it('should return todos up to reaching \"monkey\" using skipWhile()', function() {

    var texts = ["dog", "cat", "frog", "monkey", "octopus", "horse", "orangutan"];
    var todos = Immutable.Map();

    _.each(_.range(texts.length), function(index) {
      todos = addTodo(todos, new Todo("Todo" + index, texts[index], false));
    });

    var upToMonkey = stopAtMonkey(todos);

    todos.takeLast(4).forEach(function(todo) {
      expect(upToMonkey.get(todo.id)).to.equal(todo);
    });
  });

});

mocha.run();
