import { createContext, useContext } from "react";
const GlobalContext = createContext({});

export const useApi = () => {
  const { toast, setisLoading }: any = useContext(GlobalContext);
  const toastRef = toast.current;
  const commonApiCall = async ({ endPoint, params }: any) => {
    setisLoading(true);
    try {
      console.log(process.env.NEXT_PUBLIC_BASE_URL, process.env);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endPoint}`, params);

      if (!response.ok) {
        const error = await response.json();
        toastRef.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Something went wrong!",
        });
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    } finally {
      setisLoading(false);
    }
  };

  return { commonApiCall, toastRef };
};

export default GlobalContext;
