import {describe, expect, it, beforeEach, afterEach} from '@jest/globals';
import LoginForm from "../components/signIn/loginForm";
import * as ReactDOM from "react-dom";

describe("Login tests", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<LoginForm />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Should renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(5);
    expect(inputs[0].name).toBe("email");
    expect(inputs[1].name).toBe("password");
    expect(inputs[2].value).toBe("Login");
    expect(inputs[3].value).toBe("Register");
    expect(inputs[4].value).toBe("Cancel");
  });
});
