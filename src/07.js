mocha.setup('bdd');
var expect = chai.expect;

describe('Using fromJS() to Convert Plain JavaScript Objects into Immutable Data', function() {

  it('should create deeply nested Map() from a plain javascript object', function() {

    var plainJSObject = {
      title: "Go to grocery",
      text: "I need milk and eggs",
      completed: false,
      category: {title: "House Duties", priority: 10}
    };

    var immutableTodo = Immutable.fromJS(plainJSObject);

    expect(Immutable.Map.isMap(immutableTodo)).to.be.true;
    expect(immutableTodo.getIn(["category", "title"])).to.equal("House Duties");

  });

  it('should create deeply nested List() from a plain javascript array', function() {

    var plainJSArray = [
      "Go to grocery",
      "Buy milk and eggs",
      "Help kids with homework",
      ["Buy Lemons", "Make Lemonade"]
    ];

    var immutableTodoList = Immutable.fromJS(plainJSArray);

    expect(Immutable.List.isList(immutableTodoList)).to.be.true;
    expect(immutableTodoList.getIn([3, 1])).to.equal("Make Lemonade");

  });

  it('should use reviver to generate Map() instead of List() from a plain javascript array', function() {

    var plainJSArray = [
      "Go to grocery",
      "Buy milk and eggs",
      "Help kids with homework",
      ["Buy Lemons", "Make Lemonade"]
    ];

    var immutableTodo = Immutable.fromJS(plainJSArray, function(key, value) {
      return value.toMap();
    });

    expect(Immutable.Map.isMap(immutableTodo)).to.be.true;
    expect(immutableTodo.getIn([3, 1])).to.equal("Make Lemonade");

  });

});

mocha.run();
