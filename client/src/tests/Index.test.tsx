import AuthCheck from "../components/middleware/authCheck"; 

describe("AuthCheck", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns false if no token is present in local storage", () => {
    expect(AuthCheck("admin")).toBe(false);
  });

  // it("returns false if the token's role does not match the required role", () => {
  //   localStorage.setItem("token", "validToken");
  //   const spy = jest.spyOn(jwtDecode, 'default');
  //   spy.mockImplementationOnce(() => ({ role: "user" }));
  //   expect(AuthCheck("admin")).toBe(false);
  // });

  // it("returns true if the token's role matches the required role", () => {
  //   localStorage.setItem("token", "validToken");
  //   const spy = jest.spyOn(jwtDecode, 'default');
  //   spy.mockImplementationOnce(() => ({ role: "admin" }));
  //   expect(AuthCheck("admin")).toBe(true);
  // });
});