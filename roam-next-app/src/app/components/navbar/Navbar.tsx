import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
    return (
        <nav className="w-full sticky z-50 top-0 left-0 border-b py-2 bg-white">
            <div className="max-w-[1500px] mx-auto px-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex items-center mr-6">
                            <Link href="/">
                                <Image
                                src="/logo-og.png"
                                alt="roam logo"
                                width={147.85}
                                height={39}
                                >
                                </Image>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Search/>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center mr-2">
                            <Login/>
                        </div>
                        <div className="flex items-center">
                            <Signup/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;