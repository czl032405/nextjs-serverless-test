import TestService from "./test";

class Hub {
    testService = new TestService();
}

const hub = new Hub();

export default hub;
