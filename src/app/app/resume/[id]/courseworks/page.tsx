interface CourseworksProps {
  params: Promise<{ id: string }>;
}

const Courseworks = async ({ params }: CourseworksProps) => {
  const { id } = await params;
  return null;
};

export default Courseworks;
