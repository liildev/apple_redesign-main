import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../store/features/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  MenuIcon,
  XIcon
} from "@heroicons/react/outline";

export default function Header() {
  const items = useSelector(selectBasketItems);
  const { data: session } = useSession();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
      <button onClick={handleShow} className="block md:hidden">
        {show ? <XIcon className="headerIcon"
        />
          :
          <MenuIcon className="headerIcon"
          />
        }
      </button>

      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-8 w-8 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src="/logo.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
      </div>
      <ul className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
        {session ?
          <a className="headerLink" onClick={() => signOut()}>Sign Out</a>
          :
          <a className="headerLink" onClick={() => signIn()}>Sign In</a>
        }
      </ul>

      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <SearchIcon className="headerIcon hidden md:block" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                {items.length}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <img
            src={session.user?.image || "/avatar.png"}
            alt="User"
            className="cursor-pointer h-[34px] w-[34px]  rounded-full hidden md:block"
          />
        ) : (
          <UserIcon className="headerIcon hidden md:block" />
        )}
      </div>

      <div
        className={`menu ${show ? "left-0" : "-left-full"
          }`}
        onClick={() => setShow(false)}
      >
        <div className="flex items-center justify-between mt-2">
          <input type="text" placeholder="Search..." className="w-full mr-3 bg-gray-300 rounded-md p-1.5" />
          {session ? (
            <Image
              src={
                session.user?.image ||
                "/avatar.png"
              }
              alt=""
              className="cursor-pointer rounded-full"
              width={40}
              height={40}
            />
          ) : (
            <UserIcon className="headerIcon" />
          )}
        </div>

        <ul className="flex flex-col items-start
    border-gray-300 divide-y cursor-pointer">
          <a className="menuLink">Product</a>
          <a className="menuLink">Explore</a>
          <a className="menuLink">Support</a>
          <a className="menuLink">Business</a>
          {session ?
            <a className="menuLink" onClick={() => signOut()}>Sign Out</a>
            :
            <a className="menuLink" onClick={() => signIn()}>Sign In</a>
          }
        </ul>
      </div>
    </header>
  );
}


