import { ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { removeFromBasket } from "../store/features/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface Props {
    items: Product[];
    id: string;
}

function CheckoutProduct({ id, items }: Props) {
    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));

        toast.error(`${items[0].title} removed from basket`, {
            position: "bottom-center",
        });
    };

    return (
        <div className="flex flex-col gap-x-4 border-b border-gray-300 py-3 lg:flex-row lg:items-center">
            <div className="relative h-44 w-44">
                <Image
                    src={urlFor(items[0].image[0]).url()}
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            <div className="flex flex-1 items-end lg:items-center">
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
                        <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
                        <p className="flex items-center gap-x-1 font-semibold">
                            {items.length}
                            <ChevronDownIcon className="h-6 w-6 text-blue-500" />
                        </p>
                    </div>

                    <p className="flex text-[14px] ss:text-[16px] cursor-pointer items-center text-blue-500 hover:underline">
                        Show product details
                        <ChevronDownIcon className="h-6 w-6" />
                    </p>
                </div>
                <div className="flex flex-col items-end space-y-4">
                    <h4 className="text-sm ss:text-xl font-semibold lg:text-2xl">
                        <Currency
                            quantity={items.reduce((total, item) => total + item.price, 0)}
                            currency="USD"
                        />
                    </h4>
                    <button
                        onClick={removeItemFromBasket}
                        className="text-blue-500 hover:underline text-[14px] ss:text-[16px]"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutProduct;
