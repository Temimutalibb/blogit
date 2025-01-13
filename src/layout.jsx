import PropTypes from "prop-types";
import Footer from "./ui/footer";
import Header from "./ui/header";
import RightSide from "./ui/rightnav";
import SideNav from "./ui/sidenav";

const geistSans = {
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
};
const geistMono = {
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-0 m-0`}
      >
        <Header />
        <div className="flex">
          <div className="hidden md:block w-1/4 bg-white space-y-7 shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-2 overflow-hidden">
            <SideNav />
          </div>

          <div className="w-[100%] relative md:w-1/2">{children}</div>
          <div className="hidden md:flex w-1/4 ">
            <RightSide />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

RootLayout.propTypes = { children: PropTypes.node.isRequired };
