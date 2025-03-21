import {
  createContext,
  type Dispatch,
  useContext,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";

type HandlerApi = {
  name: string;
};

type HandlerInnerApi = {
  activeIndex: string | null;
  isSubmitting: boolean;
  fields: any[];
  highlightWords: string[];
  setHighlightWords: Dispatch<SetStateAction<string[]>>;
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
  const [highlightWords, setHighlightWords] = useState<string[]>([]);
  return (
    <HandlerInnerContext.Provider
      value={{
        activeIndex,
        isSubmitting,
        fields,
        highlightWords,
        setHighlightWords,
      }}
    >
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
