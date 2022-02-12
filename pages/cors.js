import Navbar from "../components/Navbar";

export default function Cors() {
  async function execute(){
    try {
      const response = await get(url);
      if (response.status === 200 && response.data === "Hello World") {
        return true;
      } else return false
    } catch (error) {
      //Do something with the error
      console.log(error);
    }
  }
  return (
    <>
    <Navbar />
    <div>
      <h1>CORS</h1>
      <p>
        Cross Origins Resources Sharing allows transfer of data between
        different domains.
      </p>
      <button onClick={()=>{execute()}}>Execute</button>
    </div>
    </>
  );
}
