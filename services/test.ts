class TestService {
    async wait(timeout = 1000) {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
    async test() {
        await this.wait();
        console.info("backend code");
        return "test result" + Math.random();
    }
}

export default TestService;
