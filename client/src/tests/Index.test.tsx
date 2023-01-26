jest.mock('jwt-decode', () => jest.fn(() => ({ role: 'user' })));
import AuthCheck from "../components/middleware/authCheck"; 

describe("AuthCheck", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns false if no token is present in local storage", () => {
    expect(AuthCheck("admin")).toBe(false);
  });

  it("returns false if the token's role does not match the required role", () => {
    localStorage.setItem("token", "validToken");
    expect(AuthCheck("admin")).toBe(false);
  });

  it("returns true if the token's role matches the required role", () => {
    jest.resetModules();
    jest.mock('jwt-decode', () => jest.fn(() => ({ role: 'admin' })));
    localStorage.setItem("token", "validToken"); //Enter a valid token to login as admin
    expect(AuthCheck("admin")).toBe(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
