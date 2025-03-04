"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
      label: "Sumário",
      href: `/app/resume/${id}/summary`,
      value: "summary",
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
      label: "Visualização",
      href: `/app/resume/${id}/format`,
      value: "format",
      required: true,
      appear: true,
    },
  ];

  return links;
};

export const SelectPage = ({ required, notRequired }: NavProps) => {
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
            {notRequired.map((link) => (
              <SelectItem key={link.value} value={link.value}>
                <Link href={link.href}>
                  {link.label}
                  <Badge className="ml-20 cursor-pointer">
                    Adicionar seção
                  </Badge>
                </Link>
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
  notRequired: LinkEditPage[];
}

export const LinkPage = ({ required, notRequired }: NavProps) => {
  const toggleSection = (link: LinkEditPage) => {
    console.log("[toggleSection]: ", link);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {required.map((link) => (
        <Link key={link.value} href={link.href}>
          <Button className="h-6 text-xs">{link.label}</Button>
        </Link>
      ))}
      {/* <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {notRequired.map((link) => (
              <DropdownMenuItem
                key={link.value}
                className="flex items-center space-x-2"
                disabled={link.required}
                onSelect={(e) => {
                  e.preventDefault();
                  if (!link.required) toggleSection(link);
                }}
              >
                <div className="flex flex-1 items-center space-x-2">
                  <Checkbox checked={link.appear} disabled={link.required} />
                  <span>{link.label}</span>
                </div>
                {link.required && (
                  <span className="text-xs text-gray-500">Obrigatório</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
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
  // console.log("[sections]: ", sections.data);

  useEffect(() => {
    if (sections.data) {
      const resultLinks = appSections.map((section) => {
        return section;
      });
      // console.log("resultLinks", resultLinks);
    }
  }, [sections.isLoading]);

  const required = links.filter((link) => link.required);
  const notRequired = links.filter((link) => !link.required);
  const isMobile = useIsMobile();

  if (isMobile)
    return <SelectPage required={required} notRequired={notRequired} />;
  return <LinkPage required={required} notRequired={notRequired} />;
};
