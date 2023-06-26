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
      const apiUrlEndpoint = `/api/data-router-goat`;
      const postData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: sku,
        })
      }
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      console.log("API Response: ", res.products[0]);
      setDataResponse(res.products[0]);
      // console.log("dataResponse 0: ", dataResponse);
    }
    getPageData();
  }, [router.query.id, router.isReady]);
  return (
    <main className="mt-24">
      <Navbar />
        <div id="product" className="mx-auto max-w-2xl" key={dataResponse.sku}>
          <div className="">
            <h1 className="text-3xl font-bold">{dataResponse.NAME}</h1>
            <h2 className="text-2xl">{dataResponse.DETAILS}</h2>
            <h2 className="text-2xl">{dataResponse.sku}</h2>
            {
              (dataResponse.released) && <h2 className="text-2xl">Release Date: {dataResponse.released}</h2>
            }
            {
              (dataResponse.price) && <h2 className="text-2xl mb-2">${dataResponse.price}</h2>
            }
            <h2 className="text-2xl"><a href={`${dataResponse.URL}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" target="_blank">Buy Now</a></h2>
          </div>
          <div className="mt-6 image-container">
            <img src={`${dataResponse.PICTUREURL}`} alt="" className="product-image" />
          </div>
          <div className="description">{dataResponse.description}</div>
        </div>
    </main>
  )
}
