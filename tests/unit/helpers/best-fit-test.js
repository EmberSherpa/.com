import { bestFit } from '../../../helpers/best-fit';
import { module, test } from 'qunit';

module('Unit | Helper | best fit');

test('returns undefined when width or images not specified', function(assert){
  assert.equal(bestFit(), undefined);
});

test('returns image slightly larger than width', function(assert){
  let images = [
    { width: 400 },
    { width: 500 },
    { width: 250 }
  ];
  assert.deepEqual(bestFit([images], {width: 300}), {width: 400}, `width of 300 should use width 400 which is next images`);
});
