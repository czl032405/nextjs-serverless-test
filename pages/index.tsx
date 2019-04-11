import Link from "next/link";
import "./index.less";
function Home() {
    return (
        <div>
            <Link href="/test">
                <a>Go Test Page</a>
            </Link>
        </div>
    );
}

export default Home;
