type Props = {
  label: string;
};

const Badge = ({ label }: Props) => {
  return <span>{label}</span>;
};

export default Badge;
