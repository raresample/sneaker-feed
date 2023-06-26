import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const { sku } = router.query;
  const [dataResponse, setDataResponse] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    async function getPageData() {
      const apiUrlEndpoint = `/api/data-router`;
      const postData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: sku,
        })
      }
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      console.log(res.products);
      console.log("[sku].js")
      setDataResponse(res.products);
      console.log("dataResonse: ", dataResponse);
    }
    getPageData();
  }, [router.query.id, router.isReady]);
  return (
    <main className="mt-24">
      <Navbar />
      {dataResponse.map((product) => {
        const image = product.images.split("|")[0];
        return (
          <div id="product" className="m-4 mx-auto max-w-2xl" key={product.sku}>
            <div className="">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <h2 className="text-2xl">{product.detail}</h2>
              <h2 className="text-2xl mb-2">{product.price}</h2>
              <h2 className="text-2xl"><a href={`${product.url}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" target="_blank">Buy Now</a></h2>
            </div>
            
            <div className="mt-6 relative image-container">
              <img src={`${image}`} alt="" className="product-image" />
            </div>
          </div>
        );
      })};
    </main>
  )
}
