import { createContext, useContext } from "react";
const GlobalContext = createContext({});

export const useApi = () => {
  const { toast, setisLoading }: any = useContext(GlobalContext);
  const toastRef = toast.current;
  const commonApiCall = async ({ endPoint, params }: any) => {
    setisLoading(true);
    try {
      console.log(process.env.NEXT_PUBLIC_BASE_URL, process.env);

      const response = await fetch(`https://taskboardpro.codebyvamshi.in/${endPoint}`, params);

      if (!response.ok) {
        toastRef.clear()
        const error = await response.json();
        if (response.status === 401) {
          toastRef.show({
            severity: "warn",
            summary: "Unauthorized",
            detail: "Please log in...",
          });
        } else {
          toastRef.show({
            severity: "error",
            summary: "Error",
            detail: error.message || "Something went wrong!",
          });
        }
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
