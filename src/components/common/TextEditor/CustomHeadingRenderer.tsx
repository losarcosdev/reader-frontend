export const CustomHeadingRenderer = ({ data }: any) => {
  const header = data.text;

  return <p className="text-2xl font-bold text-zinc-950 py-5">{header}</p>;
};
