export default function ProductDetails({params}: {
    params: {
        productId: string
    };
}) {
    return (
        <>
        <h1>Product List for {params.productId}</h1>
        </>
    )
}