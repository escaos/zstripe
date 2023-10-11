/* eslint-disable sort-keys */
import {
  createContext,
  memo,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {IOrder, IProduct} from '../models/Order.types';

type ProviderProps = PropsWithChildren;

type ContextProps = {
  isLoading: boolean;
  onSuccess: () => void;
  onSelectProduct?: (product: IProduct) => void;
  order?: IOrder;
};

const Context = createContext<ContextProps>({
  isLoading: true,
  onSuccess: () => {},
});

const ContextProvider = ({children}: ProviderProps): ReactElement => {
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState<IOrder>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const mountContext = () => {
      setLoading(true);
    };

    mountContext();
  }, []);

  const onSelectProduct = (product: IProduct) => {
    setOrder(prev => ({...prev, product, completed: false}));
  };

  const providerValues = useMemo(
    () => ({
      isLoading,
      order,
      success,
      onSelectProduct,
      onSuccess: () => setSuccess(true),
    }),
    [isLoading, order, success],
  );

  return <Context.Provider value={providerValues}>{children}</Context.Provider>;
};

export const MessageProvider = memo(ContextProvider);

export const useMessageContext = () => {
  return useContext(Context);
};
