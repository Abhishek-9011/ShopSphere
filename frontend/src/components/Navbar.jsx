import { Globe, Menu, School, ShoppingBag } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = token ? true : false;
  const navigate = useNavigate();
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 top-0 left-0 right-0 duration-300 z-10">
      <div className=" mx-auto max-w-7xl hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center  gap-2">
          <Globe size={"30"} />
          <Link to={"/"}>
            <h1 className="hidden md:block font-extrabold text-2xl">
              ShopSphere
            </h1>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to={"/products"}>
          <p className=" text-xl"> 
            All items
          </p>
          
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <Link to={"/cart"}>
            <ShoppingBag />
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={"/orders"}>Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate
                      }}
                    >
                      Log out
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant={"outline"}>
                <Link to={"/signin"}>Login</Link>
              </Button>
              <Button>
                {" "}
                <Link to={"/signin"}>Signup</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};
const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-4">
          <SheetTitle>ShopSphere</SheetTitle>
        </SheetHeader>
        <Separator className="mr-4" />
        <nav className="flex flex-col space-y-4 ">
          <span>Edit Profile</span>
          <span>Log out</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <Button type="submit">Dashboard</Button>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Navbar;
