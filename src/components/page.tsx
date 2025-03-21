"use client";

import React, { type PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, type LucideIcon, Search, SidebarClose } from "lucide-react";

import { useStore } from "~/store";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { PageLoading } from "./page-loading";
import { ButtonReload } from "./shared/button-reload";
import { UserDropdown } from "./user-dropdown";

const PageNavbarLeftContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => (
  <div
    ref={ref}
    className="flex h-10 items-center justify-between gap-2"
    {...props}
  />
));

PageNavbarLeftContent.displayName = "PageNavbarLeftContent";

const PageNavbarRightContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => (
  <div ref={ref} className="hidden gap-2 text-gray-500 md:flex" {...props} />
));

PageNavbarRightContent.displayName = "PageNavbarRightContent";

const PageNavbarIconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-8 w-8 items-center justify-center rounded-lg duration-200 hover:bg-gray-100",
      className,
    )}
    {...props}
  />
));

PageNavbarIconButton.displayName = "PageNavbarIconButton";

const PageNavbarPrimaryButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "hidden h-8 items-center justify-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs text-white duration-200 md:flex",
      className,
    )}
    {...props}
  />
));

PageNavbarPrimaryButton.displayName = "PageNavbarPrimaryButton";

const PageNavbar = ({ children }: Readonly<PropsWithChildren>) => {
  const { setIsSidebarOpen } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between p-4 text-gray-500">
        {children}

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center text-gray-500 md:hidden"
        >
          <SidebarClose size={16} />
        </button>
      </div>

      <hr className="mx-2 bg-gray-400" />
    </div>
  );
};

interface PageContentProps extends Readonly<PropsWithChildren> {
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

const PageContent = ({
  children,
  isLoading,
  isError,
  className,
}: PageContentProps) => {
  return (
    <main
      className={cn(
        "sm:px-30 w-full space-y-4 p-4 md:px-32 md:py-6",
        className,
      )}
    >
      {isLoading ? (
        <PageLoading />
      ) : isError ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <Image src="/error.png" width={200} height={200} alt="Error image" />
          <h3 className="text-2xl font-semibold">Oops!</h3>
          <p>
            Nós sentimos muito ocorreu um erro ao carregar a página que você
            solicitou!
          </p>
          <ButtonReload />
        </div>
      ) : (
        children
      )}
    </main>
  );
};

const PageContentTwoSections = ({
  children,
  isLoading,
  isError,
}: PageContentProps) => {
  return (
    <PageContent isLoading={isLoading} isError={isError}>
      <div className="flex flex-col gap-5 md:flex-row">{children}</div>
    </PageContent>
  );
};

interface PageNavbarSearchActionProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
}

export function PageNavbarSearchAction({
  title,
  subtitle,
  icon: Icon,
  children,
}: PageNavbarSearchActionProps) {
  const router = useRouter();

  return (
    <PageNavbar>
      <PageNavbarLeftContent>
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border">
            <Icon size={18} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
            <p className="text-xs font-medium text-gray-500">{subtitle}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="group flex gap-3 rounded-full sm:hidden"
        >
          <ArrowLeft className="group-hover:text-primary" />
        </Button>
      </PageNavbarLeftContent>

      <PageNavbarRightContent>
        <UserDropdown />
        {/* <PageNavbarIconButton>
          <Search size={16} />
        </PageNavbarIconButton> */}
        {children}
      </PageNavbarRightContent>
    </PageNavbar>
  );
}

export {
  PageNavbar,
  PageContent,
  PageNavbarIconButton,
  PageNavbarLeftContent,
  PageNavbarPrimaryButton,
  PageContentTwoSections,
  PageNavbarRightContent,
};
