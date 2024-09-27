import { AuthDTO } from './auth-dto';

describe('AuthDto', () => {
  it('should create an instance', () => {
    expect(new AuthDTO('','')).toBeTruthy();
  });
});
