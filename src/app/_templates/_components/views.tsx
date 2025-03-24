import { MapPin, Phone, Mail } from "lucide-react";

interface LocationViewProps {
  state?: string;
  city?: string;
  country?: string;
  delimitier?: string;
}

export const LocationView = ({
  state,
  city,
  country,
  delimitier = " - ",
}: LocationViewProps) => {
  const result = [city, state, country]
    .filter((word) => !!word)
    .join(delimitier);
  return (
    <div className="inline-flex items-center gap-1 text-muted-foreground">
      <MapPin size={12} />
      <div className="flex">
        <p>{result}</p>
      </div>
    </div>
  );
};

interface PhoneViewProps {
  phone?: string;
}

export const PhoneView = ({ phone }: PhoneViewProps) => {
  if (!phone) return null;

  return (
    <div className="inline-flex items-center gap-1 text-muted-foreground">
      <Phone size={12} />
      <p>{phone}</p>
    </div>
  );
};

interface EmailViewProps {
  email?: string;
}

export const EmailView = ({ email }: EmailViewProps) => {
  if (!email) return null;

  return (
    <div className="inline-flex items-center gap-1 text-muted-foreground">
      <Mail size={12} />
      <p>{email}</p>
    </div>
  );
};
