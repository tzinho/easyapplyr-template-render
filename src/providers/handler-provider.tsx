import { createContext, useContext, type ReactNode } from "react";

type HandlerApi = {
  name: string;
};

type HandlerInnerApi = {
  activeIndex: string | null;
  isSubmitting: boolean;
  fields: any[];
};

const HandlerContext = createContext<HandlerApi | undefined>(undefined);
const HandlerInnerContext = createContext<HandlerInnerApi | undefined>(
  undefined,
);

type HandlerProviderProps = { children: ReactNode; name: string };
type HandlerInnerProviderProps = {
  children: ReactNode;
  activeIndex: string | null;
  isSubmitting: boolean;
  fields: any[];
};

export const HandlerProvider = ({ children, name }: HandlerProviderProps) => {
  return (
    <HandlerContext.Provider value={{ name }}>
      {children}
    </HandlerContext.Provider>
  );
};

export const HandlerInnerProvider = ({
  children,
  activeIndex,
  isSubmitting,
  fields,
}: HandlerInnerProviderProps) => {
  return (
    <HandlerInnerContext.Provider value={{ activeIndex, isSubmitting, fields }}>
      {children}
    </HandlerInnerContext.Provider>
  );
};

export const useHandler = () => {
  const context = useContext(HandlerContext);
  if (!context) throw new Error("the useHandler needs to use inside a Handler");
  return context;
};

export const useHandlerInner = () => {
  const context = useContext(HandlerInnerContext);
  if (!context)
    throw new Error("the useHandlerInner needs to use inside a Handler");
  return context;
};
