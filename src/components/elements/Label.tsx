type Props = {
  name: string;
  label: string;
};

const Label = (props: Props) => {
  const { name, label } = props;
  return (
    <>
      <label htmlFor={name} className={`font-medium`}>{label}</label>
    </>
  );
};

export default Label;
