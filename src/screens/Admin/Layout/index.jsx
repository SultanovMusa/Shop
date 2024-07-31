import { Sidebar } from "./Sidebar";

export const AdminLayout = ({ children }) => {
  return (
    <main className="flex mt-[60px]">
      <Sidebar />
      {children}
    </main>
  );
};
