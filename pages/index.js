import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import styles from "../styles/Home.module.css";

export default function Home({ session }) {
  const [statuses, setStatuses] = useState();

  async function handleOnSearchSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");

    const results = await fetch("/api/twitter/search", {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
    }).then((res) => res.json());

    setStatuses(results.data);
  }

  async function handleOnTweetThread(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const thread = formData.get("thread");

    const result = await fetch("/api/twitter/thread", {
      method: "POST",
      body: JSON.stringify({ thread }),
    }).then((res) => res.json());
  }

  async function handleOnTweetSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const status = formData.get("status");

    const results = await fetch("/api/twitter/tweet", {
      method: "POST",
      body: JSON.stringify({
        status,
      }),
    }).then((res) => res.json());

    alert("Success!");
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome {session ? session.user.name : "to Next.js"}
        </h1>

        <p className={styles.description}>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          )}
        </p>

        <div>
          <form onSubmit={handleOnTweetSubmit}>
            <h2>Tweet</h2>
            <textarea name="status" />
            <button>Tweet</button>
          </form>

          <form onSubmit={handleOnTweetThread}>
            <h2>Tweet thread</h2>
            <textarea name="thread" />
            <button>Tweet</button>
          </form>

          <form onSubmit={handleOnSearchSubmit}>
            <h2>Search</h2>
            <input type="search" name="query" />
            <button>Search</button>
          </form>

          {statuses && (
            <ul>
              {statuses.map(({ id, text, user }) => {
                return (
                  <li key={id}>
                    <p>{text}</p>
                    <p>
                      By {user.name} ({user.screen_name})
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
