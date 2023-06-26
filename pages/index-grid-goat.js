import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar";
import Image from "next/image";

import PaginationRefined from "@/components/PaginationRefined";

export default function Home() {
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `/api/data-goat`;
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      console.log(res.products);
      setDataResponse(res.products);
    }
    getPageData();
  }, []);

  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const currentProducts = dataResponse.slice(firstPostIndex, lastPostIndex);

  return (
    <main className="mt-16 mb-8 bg-slate-100">
      <Navbar />

      {/* grid experiment */}
      <section className="mx-12 mb-8 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
          
          {currentProducts.map((product) => {
            const productUrl = `/products/goat/${product.sku}`
            return (
              <><div className="product-card max-w-s mb-2 bg-orange-100 border-2 border-black" key={product.sku}>
                <a href={productUrl}>
                  <div className="overflow-hidden">
                    <img className="grid-image w-full bg-white transition duration-300 ease-in-out hover:scale-110"
                      src={`${product.PICTUREURL}`}
                      alt="product" />
                  </div>
                  <div className="px-6 py-4 grid grid-cols-3">
                    <h4 className="mb-1 text-xl font-semibold tracking-tight text-gray-800 col-span-2">{product.NAME}</h4>
                    <div>
                      {
                        (product.price) && <h5 className="flex justify-end pt-1">${product.price}</h5>
                      }
                    </div>
                    {/* <p className="leading-normal text-gray-700">We could put a brief product description here.</p> */}
                  </div>
                </a>
              </div></>
            );
          })}
        </div>        
      </section>
      <PaginationRefined
        totalProducts={dataResponse.length}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </main>
  )
}
