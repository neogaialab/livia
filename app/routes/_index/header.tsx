import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { useState } from "react";
import { GoogleLogo } from "~/components/icons/GoogleLogo";

export default function Header({ isLogged }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Log Out",
  ];

  return <Navbar onMenuOpenChange={setIsMenuOpen}>
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden hidden"
      />
      <NavbarBrand>
        <p className="ml-2 font-bold text-inherit">Livia</p>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent justify="end">
      <NavbarItem>
        {!isLogged ? <Button color="primary" as={Link} href="/api/auth/google" variant="flat">
          <GoogleLogo />
          Entrar
        </Button> : <Button color="primary" as={Link} href="/api/auth/logout" variant="flat">
          <GoogleLogo />
          Sair
        </Button>}
      </NavbarItem>
    </NavbarContent>

    <NavbarMenu className="hidden">
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={
              index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
            }
            className="w-full"
            href="#"
            size="lg"
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  </Navbar>
}