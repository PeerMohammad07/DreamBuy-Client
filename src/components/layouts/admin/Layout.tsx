import { ReactNode } from "react";
import Sidebar from "./SideNav";

export interface node {
  children : ReactNode
}

export default function Layout({ children }:node) {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
