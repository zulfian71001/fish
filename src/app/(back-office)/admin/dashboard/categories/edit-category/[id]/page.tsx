import EditCategory from "@/components/back-office/editCategory";


const Page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <EditCategory categoryId={params.id} />
    </>
  );
};

export default Page;
