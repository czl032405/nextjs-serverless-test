import React from "react";
import { NextContext } from "next";

interface ITestProps {
    userAgent: string;
    JAVA_HOME: string;
}

class Test extends React.Component<ITestProps> {
    static async getInitialProps({ req }: NextContext) {
        let userAgent = "error";
        if (req && req.headers && req.headers["user-agent"]) {
            userAgent = req.headers["user-agent"];
        } else if (typeof window !== "undefined") {
            userAgent = navigator.userAgent;
        }

        return { userAgent, JAVA_HOME: process.env.JAVA_HOME };
    }

    render() {
        return (
            <div>
                test
                <p>{"AAA"}</p>
                <p data-test={this.props.JAVA_HOME}>2333 ${this.props.userAgent}</p>
                <p>C:\Program Files\Java\jdk1.8.0_171</p>
            </div>
        );
    }
}

export default Test;
