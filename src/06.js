mocha.setup('bdd');
var expect = chai.expect;

function Todo(title, text, completed) {
    this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.title = title;
    this.text = text;
    this.completed = completed;
}

function addTodo(todos, todo) {
  return todos.set(todo.id, todo);
}

describe('Equality Checking with .is() and More', function() {

  it('should find different maps equal if keys and values are the same', function() {

    var map1 = Immutable.Map({a:1, b:1, c:Immutable.List.of(1)});
    var map2 = Immutable.Map({a:1, b:1, c:Immutable.List.of(1)});

    expect(map1).to.not.equal(map2);
    expect(Immutable.is(map1, map2)).to.be.true;

  });

  it('should be equal if subset is equal', function() {

    var map1 = Immutable.Map({a:1, b:1});
    var map2 = Immutable.Map({a:1, b:1, c:3});

    expect(map1.isSubset(map2)).to.be.true;
    expect(map2.isSubset(map1)).to.not.be.true;

  });

  it('should be equal if superset is equal', function() {

    var map1 = Immutable.Map({a:1, b:1});
    var map2 = Immutable.Map({a:1, b:1, c:3});

    expect(map2.isSuperset(map1)).to.be.true;
    expect(map1.isSuperset(map2)).to.not.be.true;

  });


});

mocha.run();
