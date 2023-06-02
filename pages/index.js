import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar";

export default function Home() {
  const [dataResponse, setDataResponse] = useState([]);
  const [compareDate, setCompareDate] = useState(new Date().toISOString());

  useEffect(() => {
    async function getInitialData() {
      try {
        const apiUrlEndpoint = `/api/data-scroll`;
        const postData = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            compareDate: compareDate,
          }),
        };
        const response = await fetch(apiUrlEndpoint, postData);
        const res = await response.json();
        console.log(res.products);
        setDataResponse(res.products);
        setCompareDate(res.products[res.products.length - 1]?.scrapedate);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    }

    getInitialData();
  }, []);

  useEffect(() => {
    async function getPageData() {
      try {
        const apiUrlEndpoint = `/api/data-scroll`;
        const postData = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            compareDate: compareDate,
          }),
        };
        const response = await fetch(apiUrlEndpoint, postData);
        const res = await response.json();
        console.log(res.products);
        setDataResponse((prevData) => [...prevData, ...res.products]);
        setCompareDate(res.products[res.products.length - 1]?.scrapedate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        getPageData();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [compareDate]);


  return (
    <main className="mt-24 mb-8">
      <Navbar />
      {dataResponse.map((product) => {
        const image = product.images.split("|")[0];
        const productUrl = `/products/${product.sku}`
        return (
<div className="mb-8 flex justify-center" key={product.sku}>
  <a
    href={productUrl}
    className="w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <div className="relative flex-shrink-0 h-80 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg overflow-hidden">
      <img
        className="object-fit w-full h-full"
        style={{ objectPosition: "center -16px" }}
        src={`${image}`}
        alt=""
      />
    </div>
    <div className="flex flex-col flex-grow p-4 leading-normal">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We could put a brief product description here.</p>
    </div>
  </a>
</div>

        );
      })}
    </main>
  )
}
