# Testing

Writing tests helps you to:
1. build confidence in how your code works
2. reduce potential bugs & deliver new changes quickly
3. receive instant feedback & catch regression early
4. refactor, deploy and release with higher confidence

## Unit tests

Unit tests check the logic of individual functions or units in isolation. They are at the base of the Testing Pyramid because they take the least time and cost.

Unit tests should be:
- Fast: quick to be run and see the results
- Isolated: should not be influenced by any external factors
- Repeatable: output shouldn't change based on being run on different environments
- Self-validating: no manual work needed to check if test passed or not
- Thorough: should cover happy and error paths, edge cases, large input values, etc

Example: you have a function sum() that calculates the sum of two numbers. You want to test if 2+2 equals 4, 2+3 equals 5, etc.

## Integration tests

Integration tests validate the interaction of a piece of code with external components. For this reason, they run slower than unit tests.

Example: you have two modules Users and Groups. Users calls Groups to retrieve user groups information. You want to test the integration between these two modules.

## E2E tests

E2E tests are at the top of the Testing Pyramid because they involve the largest scope and are the most complex.
- for frontend applications, E2E tests are UI tests where the actual user interaction is checked in combination with API.
- for backend applications, E2E tests are more like API tests, where we test how our API is responding to requests.

They take the longest to run as they replicate the way an actual user or service interaction and check all the system layers.

Example: you have an endpoint POST /users to create users. You want to test API status codes, response structure, etc.

## Testing libraries in Node.js

- Jest
- Mocha
Mocha is a little more complicated than Jest when it comes to ease of use. Jest is designed to be simple and straightforward, while Mocha has more options and can be more difficult to learn.

## Getting started with Jest

Installation
```
npm install --save-dev jest
```

package.json
```
{
    "scripts": {
      "test": "jest"
    }
}
```

jest.config.js
```
module.exports = {
    testEnvironment: 'node',
    roots: ['./src'],
};
```

Typescript support
```
npm install --save-dev ts-jest @types/jest
```

jest.config.js
```
module.exports = {
  preset: 'ts-jest',
};
```

## Jest core concepts

### Grouping tests
Both functions do exactly the same thing
```
// example with test()
test('adds 5 + 2 to equal 7', () => {
    expect(sum(5, 2)).toBe(7);
});
// example with it()
it('adds 5 + 2 to equal 7', () => {
    expect(sum(5, 2)).toBe(7);
});
```

Several tests can be grouped using describe().
```
describe('Create user', () => {
    it('should create valid user object', () => { ... })
    it('should throw error if username & password are not provided', () => { ... })
})
```

## Jest Test Lifecycle

The Four Main Lifecycle Methods
- beforeAll()
  Runs once before all tests in a test suite (describe block)
  Used for one-time setup (e.g., database connection)
- afterAll()
  Runs once after all tests complete
  Used for cleanup (e.g., closing database connection)
- beforeEach()
  Runs before each individual test
  Used to reset state between tests
- afterEach()
  Runs after each individual test
  Used for cleanup after each test

## Mocks

Mocks are a way to isolate the code you're testing by replacing dependencies (like functions, modules, or entire libraries) with fake versions that you control.

Real API
```
import axios from 'axios';
const API_URL = 'https://api.genderize.io';

type GenderResponse = {
    name: string;
    gender: string;
    probability: number;
    count: number;
};

const getGenderByName = async (name: string): Promise<GenderResponse | Error> => {
    const { data: gender } = await axios.get < GenderResponse > (`${API_URL}?name=${name}`);
    return gender;
};

export default getGenderByName;
```

Mock
```
import axios from 'axios';
import getGenderByName from './get-gender-by-name';

const GENDER_JOHN = {
    name: 'john',
    gender: 'male',
    probability: 0.999,
    count: 1,
};

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('[Mocks] Get gender by name', () => {
    test('should return gender', async () => {
        mockedAxios.get.mockResolvedValue({ data: GENDER_JOHN });
        const genderResponse = await getGenderByName(GENDER_JOHN.name);
        expect(genderResponse).toEqual(GENDER_JOHN);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
});
```

### jest.spyOn()

jest.spyOn() is like hiring a detective to watch a specific function and report back to you about:
- Was the function called?
- How many times?
- With what arguments?
- What did it return?

But here's the key part: the original function keeps working normally unless you tell the detective to interfere.

```
import axios from 'axios';
import getGenderByName from './get-gender-by-name';

const GENDER_JOHN = {
    name: 'john',
    gender: 'male',
    probability: 0.999,
    count: 1,
};

describe('[Spies] Get gender by name', () => {
    test('should return gender', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: GENDER_JOHN }));
        const genderResponse = await getGenderByName(GENDER_JOHN.name);
        expect(genderResponse).toEqual(GENDER_JOHN);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
});
```

## Code Coverage

Code coverage is a metric that can help you understand how much of your source is tested.
- Shows untested parts of your code
- Helps catch hidden bugs
- Improves code quality
- Encourages writing more complete tests

### Types of Code Coverage
- Line Coverage – Did each line of code run?
- Branch Coverage – Did every if/else or switch path get tested?
- Function Coverage – Was each function or method called?
- Statement Coverage – Were all statements executed?

### How It Works
1. A coverage tool adds trackers into your code (this is called instrumentation).
2. You run your tests.
3. The tool watches which parts of the code were executed.
4. It creates a report showing what was tested (and what wasn't).
