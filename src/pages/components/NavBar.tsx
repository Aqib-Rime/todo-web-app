import { useAtom } from "jotai";
import { NextPage } from "next";
import { useState } from "react";
import {isLoggedIn} from '../jotaiStore/loggedInInfo'

const NavBar = () => {
  const [loggedIn] = useAtom(isLoggedIn)

  return (
    <div className="flex justify-between bg-green-400 px-5 py-3">
      <div>TODO APP</div>
      {!loggedIn ? <div>SignIn | Register</div> : <div>Avatar Button</div>}
    </div>
  );
};

export default NavBar;
