import { BrandIcon } from "@/assets/BrandIcon";
import BackgroundGraphic from "@/components/layout/BackgroundGraphic";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/nav";
import { DotPattern } from "@/components/ui/magicui/dot-pattern";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="relative min-h-dvh w-full bg-radial-[at_50%_100%] from-[#0D9FC71A] to-55% to-[#0D352A00]">
      <div className="-z-50 pointer-events-none fixed min-h-dvh w-full">
        <DotPattern />
      </div>
      <Outlet />
      <div className="pointer-events-none fixed top-0 min-h-dvh w-full">
        <BackgroundGraphic />
        <Link to="/" className="pointer-events-auto">
          <BrandIcon className="pt-5 pl-5" />
        </Link>
      </div>
      <Nav />
      <Footer />
    </div>
  );
};

export default Layout;
