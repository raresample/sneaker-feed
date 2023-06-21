import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [dataResponse, setDataResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `/api/data-paginated`;
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
            const image = product.images.split("|")[0];
            const productUrl = `/products/${product.sku}`
            return (
              <><div className="max-w-s mb-2 rounded-lg shadow-lg bg-orange-100" key={product.sku}>
                <a href={productUrl}>
                  <img className="w-full"
                      src={`${image}`}
                      alt="product" />
                  <div className="px-6 py-4">
                      <h4 className="mb-1 text-xl font-semibold tracking-tight text-gray-800">{product.title}</h4>
                      {/* <p className="leading-normal text-gray-700">We could put a brief product description here.</p> */}
                  </div>
                </a>
              </div></>
            );
          })}
        </div>        
      </section>
      <Pagination
        totalProducts={dataResponse.length}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </main>
  )
}
