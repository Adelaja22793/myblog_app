import Image from 'next/image'

type Product = {
  "id": 11,
  "title": "perfume Oil",
  "description": "Mega Discount, Impression of A...",
  "price": 13,
  "images": [
    "https://i.dummyjson.com/data/products/11/1.jpg",
    // "https://i.dummyjson.com/data/products/11/2.jpg",
    // "https://i.dummyjson.com/data/products/11/3.jpg",
    // "https://i.dummyjson.com/data/products/11/thumbnail.jpg"
  ]
}

async function getProduct() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const res = await fetch('https://dummyjson.com/products')
    if(!res.ok){
      throw new Error("Unable for fetch products");
    }
    return res.json()
  }catch (error: any) {
    console.log(error.message);
  }
}

export default async function Page() {
  const products: Product[] = (await getProduct()).products;
  console.log(products);
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return (
        <div className="w-full min-h-screen text-black">
          <h1 className='flex justify-center items-center'>Product</h1>
          <div className="w-full max-w-5xl mx-auto px-5 py-10 grid grid-cols-3 gap-5">
          {products.map((post) => (
            <div className="w-full rounded shadow bg-white">
              <img src={post.images[0]} alt="" className='w-full aspect-square max-h-[300px] rounded'/>
              <div className="w-full p-4">
                <div>{post.title}</div>
                <p className="text-sm text-gray-500">{post.description}</p>
                <span className="text-red-700 font-medium">${post.price}</span>
              </div>
            </div>
            
          ))}
          </div>
        </div>
      )
}
