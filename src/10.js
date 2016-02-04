mocha.setup('bdd');
var expect = chai.expect;

function generateFibonacci(num) {
  console.log(this.generateFibonacci);
  return num <= 1 ? 1 : this.generateFibonacci(num-2) + this.generateFibonacci(num-1);
}

describe('Exploring Sequences and Range() in Immutable.js', function() {

  it('should see Seq() act like an Iterable', function() {

    var range = _.range(1000);
    var numberOfOperations = 0;

    var sequence = Immutable.Seq(range);

    expect(sequence.get(0)).to.equal(0);

  });

  it('should see that Seq() is lazy', function() {

    var range = _.range(1000);
    var numberOfOperations = 0;

    var powerOfTwo = Immutable.Seq(range)
      .map(function(num) {
        numberOfOperations++;
        return num * 2;
      });

    expect(numberOfOperations).to.equal(0);

    powerOfTwo.take(10).toArray(); // compute total lazily

    expect(numberOfOperations).to.equal(10);

  });

  it('should not produce an overflow with infinite Range()', function() {

    var powerOfTwoRange = Immutable.Range(1, Infinity);

    expect(powerOfTwoRange.size).to.equal(Infinity); // whoa

    first1000Powers = powerOfTwoRange
      .take(1000)
      .map(function(n) { return n * 2; } );

    expect(first1000Powers.size).to.equal(1000);

  });

  it('should demonstrate chaining with Seq()', function() {

    var oddPowerOfTwos = Immutable.Range(0, Infinity)
      .filter(function(n) { return n % 2 !== 0; })
      .map(function(n) { return n * 2; });

    first1000OddPowers = oddPowerOfTwos.take(1000);

    expect(first1000Powers.size).to.equal(1000);

  });

  it('should cache results of Seq()', function() {

    var objects = Immutable.Range(0, 1000).map(function() { return {}; });

    var take100 = objects.take(100).toArray();
    var take100Again = objects.take(100).toArray();

    take100.forEach(function(obj, index) {
      expect(obj === take100Again[index]).to.be.false;
    });

    var cachedObjects = Immutable.Range(0, 1000).map(function() { return {}; }).cacheResult();

    expect(cachedObjects.size).to.equal(1000);

    var take100Cached = cachedObjects.take(100).toArray();
    var take100CachedAgain = cachedObjects.take(100).toArray();

    take100Cached.forEach(function(obj, index){
      expect(obj === take100CachedAgain[index]).to.be.true;
    });

  });

  it('should memoize results of Seq()', function() {

    var objects = Immutable.Range(0, 1000).map(function() { return {}; });

    var take100 = objects.take(100).toArray();
    var take100Again = objects.take(100).toArray();

    take100.forEach(function(obj, index) {
      expect(obj === take100Again[index]).to.be.false;
    });

    var memoizedObjects = Immutable.Range(0, Infinity).map(_.memoize(function() { return {}; }));

    expect(memoizedObjects.size).to.equal(Infinity); // this should be impossible!

    var take100Memoized = memoizedObjects.take(100).toArray();
    var take100MemoizedAgain = memoizedObjects.take(100).toArray();

    take100Memoized.forEach(function(obj, index) {
      expect(obj === take100MemoizedAgain[index]).to.be.true;
    });

  });

});

mocha.run();
