import { firstNames, lastNames } from "../";
import {
  assert,
  constantFrom,
  emailAddress,
  property,
  record,
} from "fast-check";

function isValidUser(user: unknown) {
  return (
    user instanceof Object &&
    "firstName" in user &&
    "lastName" in user &&
    "email" in user
  );
}

const arbitraryUser = record({
  firstName: constantFrom(...firstNames),
  lastName: constantFrom(...lastNames),
  email: emailAddress(),
});

describe("isValidUser", () => {
  it("accepts a valid user", () => {
    assert(
      property(arbitraryUser, (user) => {
        expect(isValidUser(user)).toBe(true);
      })
    );
  });
});
