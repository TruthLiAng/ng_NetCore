import { PayModule } from './pay.module';

describe('PayModule', () => {
  let payModule: PayModule;

  beforeEach(() => {
    payModule = new PayModule();
  });

  it('should create an instance', () => {
    expect(payModule).toBeTruthy();
  });
});
