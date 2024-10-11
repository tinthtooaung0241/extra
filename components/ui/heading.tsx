interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="h-30 flex w-full flex-col items-center justify-center gap-y-2 pb-4">
      <h1 className="text-2xl font-bold md:text-5xl">{title}</h1>
      <div className="flex w-full items-center justify-center gap-x-2">
        <h3 className="text-gray-600">{description}</h3>
      </div>
    </div>
  );
};

export default Heading;
