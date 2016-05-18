import Soil from '../../lib';
import { expect } from 'chai';

describe('Soil', function() {
  const cli = new Soil();

  it('should return a function', function() {
    expect(Soil).to.be.a('function');
  });

  it('should run in test env', function() {
    expect(cli.environment).to.match(/test/i);
  });

  it('have a reference to the package.json', async function() {
    const actualPkg = require('../../package.json');
    const expectedPkg = cli.pkg;
    expect(actualPkg).to.be.eql(expectedPkg);
  });

  it('can mkdir and rmrf', async function() {
    await cli.mkdir('./.example');
    await expect('./.example').to.exist;
    await cli.rmrf('./.example');
    expect('./.example').to.exist;
  });

  it('should respond to static create method', function() {
    expect(Soil).itself.to.respondTo('create');
  });

  it('should respond to instance methodds', function() {
    expect(cli).to.respondTo('exec');
    expect(cli).to.respondTo('batch');
    expect(cli).to.respondTo('writeFile');
    expect(cli).to.respondTo('mkdir');
    expect(cli).to.respondTo('rmrf');
    expect(cli).to.respondTo('debug');
    expect(cli).to.respondTo('exists');
    expect(cli).to.respondTo('error');
    expect(cli).to.respondTo('exit');
    expect(cli).to.respondTo('banner');
    expect(cli).to.respondTo('spinner');
  });
});
