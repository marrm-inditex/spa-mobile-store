import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};
const queryClient = new QueryClient();
export const AppWrapper: React.FC<Props> = ({ children }) => {
  const router = createMemoryRouter(
    createRoutesFromElements(<Route path="*" element={children} />),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
