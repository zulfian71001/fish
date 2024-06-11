import DetailOrdersUser from "@/components/front-office/DetailOrdersUser";


const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <DetailOrdersUser orderId={params.id} />
    </>
  );
};

export default Page;
