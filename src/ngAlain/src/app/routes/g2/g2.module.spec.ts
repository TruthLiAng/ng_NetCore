import { G2Module } from './g2.module';

describe('G2Module', () => {
  let g2Module: G2Module;

  beforeEach(() => {
    g2Module = new G2Module();
  });

  it('should create an instance', () => {
    expect(g2Module).toBeTruthy();
  });
});
