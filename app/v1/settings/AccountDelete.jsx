"use client";

import { useState } from "react";

// import DeleteModal from 'components/modal/delete';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DeleteModal from "@/components/modal/DeleteModal";

export default function AccountDelete() {
  const [show, setShow] = useState(false);
  const onHide = () => setShow(false);
  return (
    <>
      <Card className="w-full border border-red-600 dark:bg-[#09090a]">
        <CardHeader className="border-b border-border p-4 pb-2">
          <h2 className="font-semibold text-primary dark:text-white">
            Delete Account
          </h2>
        </CardHeader>
        <CardContent>
          <div className="relative mb-3 mt-4 flex items-center justify-between">
            <div>
              <p className="mr-1 text-sm">
                Permanently delete your account and all its associated data,
                this action cannot be undone.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end rounded-bl-xl rounded-br-xl border-b border-border bg-primary/10">
          <Button
            size={"sm"}
            className="relative top-2"
            variant={"destructive"}
            onClick={() => {
              setShow(true);
            }}
          >
            Delete Account
          </Button>
        </CardFooter>
      </Card>
      <DeleteModal
        show={show}
        title="Delete Your Account"
        onHide={onHide}
        someRef={null}
      />
    </>
  );
}
