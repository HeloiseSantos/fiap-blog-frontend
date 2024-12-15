import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogInIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <LogInIcon /> Login
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="flex items-center">
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 p-4">
              <Input placeholder="Login" />
              <Input placeholder="Senha" />
            </div>
            <DialogFooter className="flex justify-center w-full mt-4">
              <Button type="submit">
                <LogInIcon /> Login
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
