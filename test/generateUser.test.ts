import { firstNames, lastNames } from "../";
import { constantFrom, emailAddress, record, sample } from "fast-check";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const arbitraryUser = record({
  firstName: constantFrom(...firstNames),
  lastName: constantFrom(...lastNames),
  email: emailAddress(),
});

function generateUser(overrides: Partial<User> = {}) {
  return { ...sample(arbitraryUser, 1)[0], ...overrides };
}

it("generates a user", () => {
  expect(generateUser({ email: "test@test.com" })).toMatchObject({
    firstName: expect.any(String),
    lastName: expect.any(String),
    email: "test@test.com",
  });
});
