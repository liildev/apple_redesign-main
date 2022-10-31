import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../store/features/basketSlice";

function Basket() {
    const items = useSelector(selectBasketItems);
    if (items.length === 0) return null;

    return (
        <Link href="/checkout">
            <div className="fixed bottom-5 right-5 ss:bottom-10 ss:right-10 z-50 flex h-12 w-12 ss:h-16 ss:w-16 items-center justify-center rounded-full bg-gray-300">
                {items.length > 0 && (
                    <span className="absolute -right-1.5 -top-1.5  ss:-right-2 ss:-top-2 z-50 flex w-6 h-6 ss:h-7 ss:w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white">
                        {items.length}
                    </span>
                )}
                <ShoppingBagIcon className="headerIcon h-8 w-8" />
            </div>
        </Link>
    );
}

export default Basket;
