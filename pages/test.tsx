import React from "react";
import { NextContext } from "next";
import hub from "../services/hub";

interface ITestProps {
    userAgent: string;
    NODE_ENV: string;
    JAVA_HOME: string;
    testResult: string;
    isServer: boolean;
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

        const isServer = typeof window === "undefined";

        let testResult = "";
        if (!process.browser) {
            if (req && req.headers && req.headers["user-agent"]) {
                userAgent = req.headers["user-agent"];
            }
            console.info("getInitialProps");
            testResult = await hub.testService.test();
        }

        return { isServer, userAgent, NODE_ENV: process.env.NODE_ENV, JAVA_HOME: process.env.JAVA_HOME, testResult };
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
                <p>{this.props.NODE_ENV}</p>
                <p>{this.props.JAVA_HOME}</p>
                <p>{this.props.testResult}</p>
                <p>{this.props.isServer}</p>
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
