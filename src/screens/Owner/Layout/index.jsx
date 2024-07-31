import { OwnerSidebar } from "./OwnerSidebar";

export const OwnerLayout = ({ children }) => {
  return (
    <main className="flex mt-[60px]">
      <OwnerSidebar />
      {children}
    </main>
  );
};
