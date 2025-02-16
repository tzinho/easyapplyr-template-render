"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useIsMobile } from "~/hooks/use-mobile";

type LinkEditPage = {
  label: string;
  href: string;
  value: string;
};

const getLinksEditPages = ({ id }: { id: string }) => {
  const links: LinkEditPage[] = [
    {
      label: "Contato",
      href: `/app/resume/${id}/contact`,
      value: "contact",
    },
    {
      label: "Educações",
      href: `/app/resume/${id}/educations`,
      value: "educations",
    },
    {
      label: "Experiências",
      href: `/app/resume/${id}/experiences`,
      value: "experiences",
    },
    {
      label: "Habilidades",
      href: `/app/resume/${id}/skills`,
      value: "skills",
    },
    {
      label: "Projetos",
      href: `/app/resume/${id}/projects`,
      value: "projects",
    },
    {
      label: "Sumário",
      href: `/app/resume/${id}/summary`,
      value: "summary",
    },
    {
      label: "Visualização",
      href: `/app/resume/${id}/format`,
      value: "format",
    },
  ];

  return links;
};

export const SelectPage = ({ links }: { links: LinkEditPage[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const initial = links.find((link) => link.href === pathname)!;

  const handleOnChange = (value: string) => {
    const selected = links.find((link) => link.value === value)!;
    router.push(selected.href);
  };

  return (
    <Select onValueChange={handleOnChange} defaultValue={initial.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {links.map((link) => (
            <SelectItem key={link.value} value={link.value}>
              <Link href={link.href}>{link.label}</Link>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const LinkPage = ({ links }: { links: LinkEditPage[] }) => {
  return (
    <div className="mb-5 flex items-center justify-center gap-5">
      {links.map((link) => (
        <Link key={link.value} href={link.href}>
          <Button className="h-6 text-xs">{link.label}</Button>
        </Link>
      ))}
    </div>
  );
};

export const Nav = () => {
  const { id } = useParams<{ id: string }>();
  const links = getLinksEditPages({ id });
  const isMobile = useIsMobile();

  if (isMobile) return <SelectPage links={links} />;
  return <LinkPage links={links} />;
};
