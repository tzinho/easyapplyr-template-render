"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "~/components/ui/select";
import { useIsMobile } from "~/hooks/use-mobile";
import { api } from "~/trpc/react";

type LinkEditPage = {
  label: string;
  href: string;
  value: string;
  required?: boolean;
  appear?: boolean;
};

const getLinksEditPages = ({ id }: { id: string }) => {
  const links: LinkEditPage[] = [
    {
      label: "Contato",
      href: `/app/resume/${id}/contact`,
      value: "contact",
      required: true,
      appear: true,
    },
    {
      label: "Experiências",
      href: `/app/resume/${id}/experiences`,
      value: "experiences",
      required: true,
      appear: true,
    },
    {
      label: "Educações",
      href: `/app/resume/${id}/educations`,
      value: "educations",
      required: true,
      appear: true,
    },
    {
      label: "Habilidades",
      href: `/app/resume/${id}/skills`,
      value: "skills",
      required: true,
      appear: true,
    },
    {
      label: "Projetos",
      href: `/app/resume/${id}/projects`,
      value: "projects",
      required: true,
      appear: true,
    },
    {
      label: "Cursos",
      href: `/app/resume/${id}/courseworks`,
      value: "courseworks",
      required: true,
      appear: true,
    },
    {
      label: "Certificações",
      href: `/app/resume/${id}/certifications`,
      value: "certifications",
      required: true,
      appear: true,
    },
    {
      label: "Línguas",
      href: `/app/resume/${id}/languages`,
      value: "languages",
      required: true,
      appear: true,
    },
    {
      label: "Sumário",
      href: `/app/resume/${id}/summary`,
      value: "summary",
      required: true,
      appear: true,
    },
    // {
    //   label: "Visualização",
    //   href: `/app/resume/${id}/format`,
    //   value: "format",
    //   required: true,
    //   appear: true,
    // },
  ];

  return links;
};

export const SelectPage = ({ required }: NavProps) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const initial = required.find((link) => link.href === pathname)!;

  const handleOnChange = (value: string) => {
    const selected = required.find((link) => link.value === value)!;
    router.push(selected.href);
  };

  return (
    <div className="px-4">
      <Select onValueChange={handleOnChange} defaultValue={initial.value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {required.map((link) => (
              <SelectItem key={link.value} value={link.value}>
                <Link href={link.href}>{link.label}</Link>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

interface NavProps {
  required: LinkEditPage[];
}

export const LinkPage = ({ required }: NavProps) => {
  const pathname = usePathname();
  const route = pathname.split("/").pop();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="mx-auto flex w-fit items-center justify-center gap-1 rounded-md py-[1px]">
      {required.map((link) => (
        <Link key={link.value} href={link.href}>
          <Button variant={route === link.value ? "default" : "outline"}>
            {link.label}
          </Button>
        </Link>
      ))}
      <Link href={`/app/resume/${id}/format`}>
        <Button variant={route === "format" ? "default" : "outline"}>
          Finalizar e baixar
        </Button>
      </Link>
    </div>
  );
};

const appSections = [
  "contact",
  "experiences",
  "educations",
  "skills",
  "summary",
  "projects",
  "courseworks",
  "involvements",
  "languages",
];

export const Nav = () => {
  const { id } = useParams<{ id: string }>();
  const [links, setLinks] = useState(() => {
    return getLinksEditPages({ id });
  });
  const sections = api.resumes.getSections.useQuery(id);

  useEffect(() => {
    if (sections.data) {
      const resultLinks = appSections.map((section) => {
        return section;
      });
      // console.log("resultLinks", resultLinks);
    }
  }, [sections.isLoading]);

  const required = links.filter((link) => link.required);
  // const notRequired = links.filter((link) => !link.required);
  const isMobile = useIsMobile();

  if (isMobile) return <SelectPage required={required} />;
  return <LinkPage required={required} />;
};
