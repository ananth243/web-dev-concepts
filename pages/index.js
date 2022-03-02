import Navbar from "../components/Navbar";
import Typewriter from "typewriter-effect";
import { useEffect, useContext } from "react";
import AuthContext from "../Providers/AuthContext";
import { useRouter } from "next/router";
import landing from "./landing.svg";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  const { state, setState } = useContext(AuthContext);
  useEffect(() => {
    if (state) {
      router.push("/home");
    }
  }, [router, state]);
  
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="p-10 flex justify-center content-center flex-grow items-center flex-col space-y-8">
        <Image src={landing} />
        <p className="font-mono text-4xl">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome")
                .pauseFor(1000)
                .deleteAll()
                .typeString("This site tests out your WebD knowledge")
                .start()
            }}
          />
        </p>
      </div>
    </div>
  );
}
