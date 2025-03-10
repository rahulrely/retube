import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black border-y border-gray-800 pb-10 mt-5">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                    <div className="text-4xl font-bold text-[#107678] lg:order-1">
                <Link href="/">
                    Retube
                </Link>
            </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Resources</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href={"/"} className="hover:underline hover:text-white">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/about"} className="hover:underline hover:text-white">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Follow us</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link
                                        href="https://github.com/rahulrely"
                                        className="hover:underline hover:text-white"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"#"} className="hover:underline hover:text-white">
                                        Discord
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Legal</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link href={"about"} className="hover:underline hover:text-white">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"about"} className="hover:underline hover:text-white">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
