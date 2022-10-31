import type { GetServerSideProps, } from 'next'
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { fetchProducts } from '../utils/fetchProducts'
import { fetchCategories } from '../utils/fetchCategories'
import Basket from '../components/Basket'
import Landing from '../components/Landing'
import Tabs from '../components/Tabs'
import MainLayout from '../layout'


interface Props {
  categories: Category[];
  products: Product[];
  session: Session | null;
}

export default function Home({ categories, products }: Props) {
  return (
    <MainLayout>
      <main className="relative h-[200vh] bg-[#e7ecee]">
        <Landing />
      </main>
      <Tabs categories={categories} products={products} />
      <Basket />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context);

  return {
    props: {
      categories,
      products,
      session,
    },
  };
};

