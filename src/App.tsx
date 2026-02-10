import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "@/presentation/routes";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QUERY_CACHE_TIME_MS, queryClient } from "@/config/query/queryClient";

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

const router = createBrowserRouter(appRoutes);

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: QUERY_CACHE_TIME_MS }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  );
}
