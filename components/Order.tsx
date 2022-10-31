import Currency from "react-currency-formatter";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";

interface Props {
    products: StripeProduct[];
    show: boolean;
    tablet: boolean;
    handleShow: () => void
}

export default function Order({ products, show, tablet, handleShow }: Props) {
    const subtotal = products.reduce((acc, product) => acc + product.price.unit_amount / 100, 0);
    
    const showOrderSummaryCondition = tablet ? show : true;

    return (
        <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
                className={`w-full ${showOrderSummaryCondition && "border-b"
                    } border-gray-300 text-sm lg:hidden`}
            >
                <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                    <button
                        onClick={handleShow}
                        className="flex items-center space-x-2"
                    >
                        <ShoppingCartIcon className="h-6 w-6" />
                        <p>Show order summary</p>
                        {showOrderSummaryCondition ? (
                            <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                        )}
                    </button>

                    <p className="text-md ss:text-xl font-medium text-black">
                        <Currency quantity={subtotal + 20} />
                    </p>
                </div>
            </div>

            {showOrderSummaryCondition &&
                <div className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                    <div className="space-y-4 pb-4">
                        {products.map(product =>
                            <div key={product.id} className="flex items-center space-x-4 text-sm font-medium">
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#f1f1f1] text-xs text-white">
                                    <img src="/success-logo.png" className="object-contain h-7 w-7 animate-bounce rounded-md" alt="Apple" />

                                    <p className="absolute -right-2 -top-2 flex justify-center items-center h-5 w-5 rounded-full bg-[gray] text-xs">
                                        {product.quantity}
                                    </p>
                                </div>

                                <p className="flex-1">{product.description}</p>
                                <p>
                                    <Currency
                                        quantity={product.price.unit_amount / 100}
                                        currency={product.currency}
                                    />
                                </p>
                            </div>)
                        }
                    </div>

                    <div className="space-y-1 py-4">
                        <div className="flex justify-between text-sm">
                            <p className="text-[gray]">Subtotal</p>
                            <p className="font-medium">
                                <Currency quantity={subtotal} />
                            </p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-[gray]">Discount</p>
                            <p className="text-[gray]"></p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-[gray]">Shipping</p>
                            <p className="font-medium">
                                <Currency quantity={20} currency="USD" />
                            </p>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}
