import { ReactNode } from "react";
import SellerSidebar from "./SellerSidebar";

export interface node {
  children : ReactNode
}

export default function SellerLayout({ children }:node) {
  return (
    <div>
      <SellerSidebar>{children}</SellerSidebar>
    </div>
  );
}
