import React, { Component } from "react";
import { loadPosts } from '../page'
 
// This function runs only on the server side
export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const posts = await loadPosts()
 
  // Props returned will be passed to the page component
  return { props: { posts } }
}



