import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import axios from "axios";
import Modal from "react-responsive-modal";
import Dashboard from "./components/dashboard";

export default function Home({ session }) {
  const [statuses, setStatuses] = useState();
  const [formValues, setFormValues] = useState([{ bucketitem: "" }]);
  console.log(session);

  let subtitle;
  const [open, setOpen] = useState(true);
  console.log(session);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <div>
          <Modal
            open={open}
            onClose={() => setOpen(true)}
            center
            showCloseIcon={false}
            classNames={{
              overlayAnimationIn: "customEnterOverlayAnimation",
              overlayAnimationOut: "customLeaveOverlayAnimation",
              modalAnimationIn: "customEnterModalAnimation",
              modalAnimationOut: "customLeaveModalAnimation",
              overlay: "customOverlay",
              modal: "customModal",
              h1: "customH1",
            }}
            animationDuration={800}
          >
            <div>
              <h1 className="text-2xl text-sky-600 tracking-widest mb-9 mt-4">
                TypeFreely
              </h1>

              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                {/* {!session && ( */}
                <>
                  Write thread & publish on your twitter.
                  <br />
                </>
                {/* )} */}
              </h2>
              <h2 className="text-2xl font-bold text-blue-900 mb-16">
                Boost audience🚀
              </h2>

              <button
                className="border-2 rounded-2xl p-2 text-white bg-sky-800"
                onClick={() => signIn()}
              >
                Sign in to Twitter
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <p>
          {session && (
            <>
              <Dashboard session={session} />
            </>
          )}
        </p>
      )}
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
