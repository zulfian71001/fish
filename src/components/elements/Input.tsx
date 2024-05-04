type Props = {
  classname?: string
  placeholder: string
};

const Inputs = (props: Props) => {
  const { classname, placeholder } = props;
  return (
    <>
      <input
        className={`border-none ring-2 ring-cyan-500 outline-none placeholder:opacity-70 ${classname}`}
        placeholder={placeholder}
      />
    </>
  );
};

export default Inputs;
