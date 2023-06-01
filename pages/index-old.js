import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar";

export default function Home() {
  const [dataResponse, setDataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `/api/data`;
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      console.log(res.products);
      setDataResponse(res.products);
    }
    getPageData();
  }, []);
  return (
    <main className="mt-16 mb-8">
      <Navbar />
      {dataResponse.map((product) => {
        const image = product.images.split("|")[0];
        const productUrl = `/products/${product.sku}`
        return (
          <><div className="mb-8 flex justify-center" key={product.sku}>
            <a href={productUrl} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`${image}`} alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We could put a brief product description here.</p>
              </div>
            </a>
          </div></>
        );
      })}
    </main>
  )
}
