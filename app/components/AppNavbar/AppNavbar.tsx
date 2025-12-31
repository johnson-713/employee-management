"use client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppAvatar from "@/components/AppAvatar/AppAvatar";
import { WarningModal } from "@/components/AppModal/AppModal";
import useDisclosure from "@/hooks/useDisclosure";
import { clearTokenAndUserData } from "@/utils/tokenAndUserData";
import AppText from "@/components/AppText/AppText";
import { useQuery } from "@tanstack/react-query";
import { authEndpoints } from "@/api/endpoints/endpoints";
import makeGetRequest from "@/api/makeGetRequest";

const AppNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useQuery({
    queryKey: [authEndpoints.profile],
    queryFn: () => makeGetRequest(authEndpoints.profile),
  });

  const profileData = data ?? {};

  const handleLogout = () => {
    clearTokenAndUserData();
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-[20px] pt-[13px] pb-[12px]">
        <div className="flex items-center justify-end">
          {/* Center - Search Bar */}

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <AppAvatar
                    src={profileData?.image ?? ""}
                    fallback={profileData?.firstName?.[0] || "U"}
                    className="w-10 h-10"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 p-[36px]"
                align="end"
                forceMount
              >
                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <AppAvatar
                    src={profileData?.image ?? ""}
                    fallback={profileData?.firstName?.[0] || "U"}
                    className="w-18 h-18"
                  />
                  <div className="mt-4">
                    <AppText
                      type="h2"
                      className="text-sm font-semibold text-primary m-0"
                    >
                      {profileData?.firstName ?? "-"}{" "}
                      {profileData?.lastName ?? ""}
                    </AppText>
                    <AppText
                      type="p"
                      className="text-[13px] text-[#71717A] m-0"
                    >
                      {profileData?.email ?? "-"}
                    </AppText>
                  </div>
                </div>
                <DropdownMenuItem
                  className="cursor-pointer bg-primary text-white justify-center rounded-full py-[10px] focus:bg-primary/90 focus:text-white/90"
                  onClick={onOpen}
                >
                  <LogOut className="mr-2 h-4 w-4 text-white" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <WarningModal
        isOpen={isOpen}
        onClose={onClose}
        title="Logout"
        description="Are you sure you want to logout? You will need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        isLoading={false}
        size="sm"
      />
    </>
  );
};

export default AppNavbar;
