import { createReadStream } from "fs";
import { join } from "path";

export default async function handler(req, res) {
  const stream = createReadStream(
    join(__dirname, "..", "..", "..", "..", "/public", "stream.txt")
  );
  stream.pipe(res);
  stream.on('end', ()=>{res.destroy()});
}
