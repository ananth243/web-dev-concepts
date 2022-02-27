import Navbar from "../components/Navbar";
import Typewriter from "typewriter-effect";
import { useEffect, useContext } from "react";
import AuthContext from "../Providers/AuthContext";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { state, setState } = useContext(AuthContext);
  setTimeout(()=>{
      router.push('/home');
  }, 8000);
  return (
    <>
      <Navbar />
      <div className="p-10 flex justify-center content-center">
        <p className="font-mono text-4xl">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Page not found. You will be redirected.")
                .start()
            }}
          />
        </p>
      </div>
    </>
  );
}
