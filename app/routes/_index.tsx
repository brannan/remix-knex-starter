import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import clsx from "clsx";
import styles from "~/styles/app/routes/Index.module.css";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main id="Index">
      <div className="container mt-5">
        <div className="row justify-center">
          <div className={styles.hero_container}>
            <div>
              <img
                src="https://placehold.co/600x400/555555/999999?text=Knex\nSass\nCSS Module\nStack"
                alt="Placeholder Image"
              />
            </div>
            <div className={clsx(styles.hero_overlay)}>
              <h1>
                <span>
                  Knex / Sass <br />Stack
                </span>
              </h1>
              <p className="">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div id="Login" className="">
                {user ? (
                  <Link
                    to="/notes"
                    className=""
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="">
                    <Link
                      to="/join"
                      className=""
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className=""
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="">
            <Link
              to="/posts"
              className=""
            >
              Blog Posts
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
