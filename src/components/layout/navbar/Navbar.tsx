"use client";

import * as React from "react";

import Link from "next/link";
import { SheetForAccount } from "./SheetForAccount";
import { Icons } from "../../Icons";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between px-10 p-5">
        <ul className="flex flex-row items-center gap-3 text-sm font-light">
          <li>
            <Link href="">Home</Link>
          </li>
          <li>
            <Link href="/">Store</Link>
          </li>
          <li>
            <Link href="">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center justify-center font-light">
          <Link href="/">Luxville | Store</Link>
        </div>

        <div className="flex flex-cols items-center justify-center">
          <SheetForAccount />

          <Icons.twitter className="w-4 h-4 mr-3" />
          <Icons.instagram className="w-4 h-4 mr-3" />
          <Link href="/cart" className="flex flex-cols gap-1">
            <Icons.cart className="w-5 h-5 " />

            <span className="text-black w-3 h-3">2</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
