import { PayedPipe } from './payed.pipe';

describe('PayedPipe', () => {
  it('create an instance', () => {
    const pipe = new PayedPipe();
    expect(pipe).toBeTruthy();
  });
});
