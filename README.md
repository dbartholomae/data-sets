# raw-data

[![npm package](https://badge.fury.io/js/raw-data.svg)](https://npmjs.org/package/raw-data)
[![downloads](https://img.shields.io/npm/dw/raw-data.svg)](https://npm-stat.com/charts.html?package=raw-data)
[![open issues](https://img.shields.io/github/issues-raw/dbartholomae/raw-data.svg)](https://github.com/dbartholomae/raw-data/issues)
[![semantic release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release#badge)
[![license](https://img.shields.io/github/license/dbartholomae/raw-data)](https://github.com/dbartholomae/raw-data/blob/main/LICENSE)

Raw data for testing with realistic but synthetic data.

## 🛠 Usage

This package just contains data sets, so it can be used with all sorts of
other libraries. The intended usage is with a property-based testing framework
like [fast-check](https://github.com/dubzzz/fast-check), and all advanced
examples in this documentation will use fast-check.

The initial data sets come from faker.js and this project
was inspired by faker.js being abandoned by its creator.

### Basic usage

Import the data set you want to use
```ts
import { firstNames } from 'raw-data';
// ['Alfred', 'Bertram', ...]
```

and create arbitraries from them:

```ts
import { firstNames, lastNames } from "raw-data";
import {
  assert,
  constantFrom,
  emailAddress,
  property,
  record,
} from "fast-check";

function isValidUser(user: any) {
  return (
    user != null &&
    user.firstName !== undefined &&
    user.lastName !== undefined &&
    user.email !== undefined
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
```

These can then also be used to create example data:

```ts
import { firstNames, lastNames } from "raw-data";
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

```

### Data lists

The following data lists are currently available:

* firstNames
* lastNames

## 🏠 Homepage

You can find more about this on [https://dbartholomae.github.io/raw-data](https://dbartholomae.github.io/raw-data).

## 🖋️ Contributing

If you are interested in contributing to this repository, please read up on the details in our [contributing guidelines](./CONTRIBUTING.md).

## 🤝 Show your support

Give a ⭐ if this package helped you! You can also support the development of this package by funding.

* [github.com](https://github.com/sponsors/dbartholomae)

## 📜 License

MIT. See [LICENSE file](./LICENSE) for details.

### Copyright notice

Some of the data in this library falls below the following copyright note:

* <https://github.com/stympy/faker/> - Copyright (c) 2007-2010 Benjamin Curtis
* <http://search.cpan.org/~jasonk/Data-Faker-0.07/> - Copyright 2004-2005 by Jason Kohles
