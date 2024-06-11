import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/components/front-office/Chat")) 
const page = () => {
    return (
        <>
        <Chat/>
        </>
      );
}

export default page
