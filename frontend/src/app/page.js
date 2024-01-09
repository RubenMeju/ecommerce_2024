import ListProducts from "@/components/product/ListProducts";

async function getProducts() {
  const res = await fetch("http://127.0.0.1:8000/products/");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  //console.log(products);
  return (
    <div>
      <h1>El home</h1>
      <ListProducts products={products} />
    </div>
  );
}
