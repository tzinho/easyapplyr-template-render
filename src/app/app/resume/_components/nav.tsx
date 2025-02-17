"use client";

import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
      label: "Educações",
      href: `/app/resume/${id}/educations`,
      value: "educations",
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
      required: false,
      appear: false,
    },
    {
      label: "Sumário",
      href: `/app/resume/${id}/summary`,
      value: "summary",
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
  const visibleLinks = links.filter((link) => link.appear);
  const hiddenLinks = links.filter((link) => !link.appear);

  return (
    <div className="mb-5 flex items-center justify-center gap-5">
      {visibleLinks.map((link) => (
        <Link key={link.value} href={link.href}>
          <Button className="h-6 text-xs">{link.label}</Button>
        </Link>
      ))}
      <div className="flex items-center gap-2">
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
            {links.map((link) => (
              <DropdownMenuItem
                key={link.value}
                className="flex items-center space-x-2"
                disabled={link.required}
                onSelect={(e) => {
                  e.preventDefault();
                  if (!link.required) {
                    // toggleSection(section.id)
                  }
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
      </div>
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
