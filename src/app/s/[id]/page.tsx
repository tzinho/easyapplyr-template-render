"use server";

const Preview = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>Preview: {id}</div>;
};

export default Preview;
