import EditProduct from "@/components/back-office/seller/EditProduct"

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <EditProduct productId={params.id} />
    </>
  );
};

export default Page;
