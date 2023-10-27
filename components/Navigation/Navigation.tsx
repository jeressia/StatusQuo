import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  return (
    <footer>
      <ul className="allFooterButtons">
        {["Dashboard", "Records", "Search", "Profile"].map((name, i) => {
          const lc = name.toLowerCase();

          return (
            <li
              key={i}
              className={router.pathname.includes(lc) ? "activeFooter" : ""}
            >
              <Link className="nav-link" href={`/${lc}`}>
                <div className="footerBarOption">
                  <p className="footerIcon">
                    <img
                      className="footerImg"
                      src={`icons/${lc}.svg`}
                      alt={`${lc} link`}
                    />
                  </p>
                  <p className="optionTitle">{name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Navigation;
