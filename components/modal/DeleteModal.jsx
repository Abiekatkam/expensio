"use client";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
} from "../ui/drawer";
import CircleLoader from "../loader/CircleLoader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DeleteModal = ({ show, title, onHide, someRef }) => {
  const isDesktop = true;
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState("");
  const deleteModalRef = useRef(null); 

  useEffect(() => {
    if (show && deleteModalRef.current) {
      deleteModalRef.current.showModal();
    }
  }, [show]);

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
              <DialogDescription>
                <div className="text-sm text-primary dark:text-muted-foreground">
                  Type this account email to delete your account and its data.
                </div>
              </DialogDescription>
            </DialogHeader>
            <Input
              className="mt-2 h-8 dark:bg-[#09090a]"
              placeholder="Email"
              type="email"
              //   onChange={(event) => {
              //     setVerify(event.target.value);
              //   }}
            />
            <Button
              //   onClick={onDelete}
              variant={"destructive"}
              //   disabled={loading || verify !== user.email}
              disabled={loading}
              className="user-select-none mt-3 w-full"
            >
              {loading ? <CircleLoader /> : "Confirm delete"}
            </Button>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={show}>
          <DrawerOverlay onClick={onHide} />
          <DrawerContent className="text-primary">
            <DrawerHeader className="text-left">
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pt-0 pb-8">
              <div className="text-sm text-primary dark:text-muted-foreground">
                Type this account email to delete your account and its data.
              </div>
              <Input
                className="mt-3"
                placeholder="Email"
                type="email"
                // onChange={(event) => {
                //   setVerify(event.target.value);
                // }}
              />
              <Button
                // onClick={onDelete}
                variant={"destructive"}
                // disabled={loading || verify !== user.email}
                disabled={loading}
                className="user-select-none mt-4 w-full"
              >
                {loading ? <CircleLoader /> : "Confirm delete"}
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default DeleteModal;
