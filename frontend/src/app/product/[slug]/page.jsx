async function getProductByID(slug) {
  const res = await fetch(`http://127.0.0.1:8000/products/?slug=${slug}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PageProduct({ params }) {
  const [data] = await getProductByID(params.slug);
  return (
    <div>
      <h1 className="text-2xl">Detalles del producto</h1>
      <img src={data.image} alt="" className="h-56" />

      <h2>{data.name}</h2>
      <span>{data.description}</span>
      <span>{data.price}</span>
    </div>
  );
}
