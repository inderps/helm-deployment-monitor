const assert = require('assert');
const {
  describe, it, beforeEach, afterEach
} = require('mocha');
const { stub } = require('sinon');
const fs = require('fs');
const childProcess = require('child_process');
const { getListOfCharts } = require('./../../src/server/helm');

describe('getListOfCharts', () => {
  const fakeResponse = fs.readFileSync('./test/fixtures/getListOfCharts');
  let execSync;

  beforeEach(() => {
    execSync = stub(childProcess, 'execSync');
    execSync.withArgs('helm ls').returns(fakeResponse);
  });

  afterEach(() => {
    execSync.restore();
  });

  it('should return list of apps', () => {
    const list = getListOfCharts();

    assert.equal(list.length, 10);
    assert.deepEqual(Object.keys(list[0]), ['name', 'revision', 'updated', 'status']);
  });
});
