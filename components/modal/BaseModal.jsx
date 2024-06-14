import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";

const BaseModal = ({ show, title, children, onHide, someRef }) => {
  const isDesktop = true;
  return (
    <>
      {isDesktop ? (
        <Dialog open={show} onOpenChange={onHide}>
          <DialogTrigger>
            <span style={{ display: "none" }}>Open</span>
          </DialogTrigger>
          <DialogContent className="dark:bg-[#09090a]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={show}>
          <DrawerOverlay onClick={onHide} />
          <DrawerContent className="text-primary">
            <DrawerHeader className="text-left">
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
            {children}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default BaseModal;
