"use client";
import AppNavbar from "../AppNavbar/AppNavbar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="bg-root-background min-h-screen">
      <div className="flex flex-col h-screen">
        <AppNavbar />
        <main className="flex-1 overflow-auto no-scrollbar mb-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
