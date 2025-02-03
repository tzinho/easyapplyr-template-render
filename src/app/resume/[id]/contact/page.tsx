import { api } from "~/trpc/server";
import { ContactForm } from "./_components/form";

interface ContactProps {
  params: Promise<{ id: string }>;
}

const Contact = async ({ params }: ContactProps) => {
  const { id } = await params;
  const data = await api.contact.get(id);

  return (
    <div className="w-full">
      <div className="flex w-full gap-10">
        <ContactForm data={data} />
      </div>
    </div>
  );
};

export default Contact;
