import Link from "next/link";
import { useRouter } from "next/router";

import StyledHeader from "./Header.style";


const navigationLinks = [
  {
    title: "Main",
    path: "/",
  },
  {
    title: "Posts",
    path: "/posts",
  },
];

const Header = () => {
    const {pathname} = useRouter()
  return (
    <StyledHeader>
      <div className="header__logo">LOGO</div>
      <nav className="header__nav">
        {navigationLinks.map((item) => {
          const { path, title } = item;
          return (
            <Link href={path} key={title}>
              <a className={path === pathname? "header__nav__button header__nav__button__active":"header__nav__button"}>{title}</a>
            </Link>
          );
        })}
      </nav>
    </StyledHeader>
  );
};

export default Header;
