interface OverviewDescriptionProps {
  title: string;
  description: string;
}

const OverviewDescription: React.FC<OverviewDescriptionProps> = ({ description, title }) => {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold mb-3 text-gray-600">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default OverviewDescription;
