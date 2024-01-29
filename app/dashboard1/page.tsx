// export default function Home({ data }: any) {
//     return (
//       <main>
//         <h1>A List of Blog Posts</h1>
//         {data.map((post: any) => (
//           <div key={post.id}>
//             <h2>Title: {post.title}</h2>
//             <p>Content: {post.body}</p>
//           </div>
//         ))}
//       </main>
//     );
//   }
  
//   export async function getStaticProps() {
//     //Making a get request to an API endpoint to get posts
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     return {
//       props: {
//         data,
//       },
//     };
//   }