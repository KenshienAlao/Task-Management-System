import { useEffect, useState } from "react";

import Navbar from "./page";

export default function Layout({ user, email, RemoveToken }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Navbar
      user={user}
      email={email}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
      RemoveToken={RemoveToken}
    />
  );
}
