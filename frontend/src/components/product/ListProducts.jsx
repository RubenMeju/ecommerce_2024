import Link from "next/link";
const filters = [
  "All categories",
  "Zapatillas",
  "Camisetas",
  "Pantalones",
  "Bolsos",
];
export default function ListProducts({ products }) {
  return (
    <>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        {filters.map((filter) => (
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(({ id, name, image, price, slug }) => (
          <Link key={id} href={`product/${slug}`}>
            <h2>{name}</h2>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src={image}
                alt=""
              />
            </div>
            <span>{price} $</span>
          </Link>
        ))}
      </div>
    </>
  );
}
