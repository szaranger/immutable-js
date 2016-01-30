mocha.setup('bdd');
var expect = chai.expect;

// this will take a position and update it at that place
function mutateValue(iterable, pos, value) {
  iterable[pos] = value;
}

// attempt to update state
function updateState(immutable, pos, value) {
  return immutable.set(pos, value);
}

describe('Manage Application State with Immutable.js', function() {

  it('should see side effects when mutating original array', function() {

    var state = ["todo1", "todo2"];
    var mutatedState = state; // pass in a reference

    mutateValue(mutatedState, 0, "newTodo");
    expect(state[0]).to.not.equal("todo1");

  });

  it('should avoid side effects when mutating original array', function() {

    var immutableState = Immutable.List(["todo1", "todo2"]);
    var immutableState2 = immutableState;

    updateState(immutableState2, 0, "newTodo");
    expect(immutableState.get(0)).to.equal("todo1");

  });

});

mocha.run();
