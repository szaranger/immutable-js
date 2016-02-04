mocha.setup('bdd');
var expect = chai.expect;

describe('Converting Immutable.js Structures to Javascript and other Immutable Types', function() {

  it('should convert Map() to List()', function() {

    var map = Immutable.Map({
      key1: 'First Item',
      key2: 'Second Item'
    });

    var convertedList = map.toList();

    expect(Immutable.List.isList(convertedList)).to.be.true;

    // Keys are discarded
    expect(convertedList.first()).to.equal('First Item');
    expect(convertedList.last()).to.equal('Second Item');

  });

  it('should convert List() to Map()', function() {

    var list = Immutable.List.of('First Item', 'Second Item');

    var convertedMap = list.toMap();

    // Converted keys ascend numerically
    keys = convertedMap.keys();
    expect(keys.next().value).to.equal(0);
    expect(keys.next().value).to.equal(1);

    expect(Immutable.Map.isMap(convertedMap)).to.be.true;

    expect(convertedMap.first()).to.equal('First Item');
    expect(convertedMap.last()).to.equal('Second Item');

  });

  it('should convert Map() to Javascript Array', function() {

    var map = Immutable.Map({
      key1: 'First Item',
      key2: 'Second Item',
      key3: {key4: 'Nested Item'}
    });

    var arr = map.toArray();

    // Keys are discarded
    expect(arr[0]).to.equal('First Item');
    expect(arr[1]).to.equal('Second Item');
    expect(arr[2].key4).to.equal('Nested Item');

  });

  it('should convert Map() to JSON', function() {

    var map = Immutable.Map({
      key1: 'First Item',
      key2: 'Second Item',
      key3: {key4: 'Nested Item'}
    });

    var json = map.toJSON();

    expect(json.key1).to.equal('First Item');
    expect(json.key2).to.equal('Second Item');
    expect(json.key3.key4).to.equal('Nested Item');

  });

});

mocha.run();
