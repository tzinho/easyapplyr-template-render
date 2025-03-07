import { useResumeContext } from "~/app/_templates/_components/one-column";

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useResumeContext();

  return (
    <h3
      contentEditable
      suppressContentEditableWarning
      style={{ fontSize: settings?.fontSize + 3 }}
      className="cursor-text text-wrap"
    >
      {children}
    </h3>
  );
};
