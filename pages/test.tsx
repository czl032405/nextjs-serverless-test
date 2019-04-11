import React from "react";
import { NextContext } from "next";
import hub from "../services/hub";

interface ITestProps {
    userAgent: string;
    JAVA_HOME: string;
    testResult: string;
}

interface ITestState {
    count: number;
}

class Test extends React.Component<ITestProps, ITestState> {
    constructor(P: ITestProps, S: ITestState) {
        super(P, S);
        this.state = {
            count: 1
        };
    }

    static async getInitialProps({ req }: NextContext) {
        let userAgent = "error";
        if (req && req.headers && req.headers["user-agent"]) {
            userAgent = req.headers["user-agent"];
        } else if (typeof window !== "undefined") {
            userAgent = navigator.userAgent;
        }
        console.info("getInitialProps");
        let testResult = await hub.testService.test();
        return { userAgent, JAVA_HOME: process.env.JAVA_HOME, testResult };
    }

    handleTestClickEvent(e: React.MouseEvent) {
        console.info(e);
        this.setState({
            count: this.state.count + 1
        });
    }

    handleAjaxClickEvent(e: React.MouseEvent) {
        console.info(e);
    }

    render() {
        return (
            <div>
                test
                <p>{this.props.userAgent}</p>
                <p>{this.props.JAVA_HOME}</p>
                <p>{this.props.testResult}</p>
                <p>{this.state.count}</p>
                <p>
                    <button onClick={this.handleTestClickEvent.bind(this)}>count</button>
                </p>
                <p>
                    <button onClick={this.handleAjaxClickEvent.bind(this)}>ajax</button>
                </p>
            </div>
        );
    }
}

export default Test;
