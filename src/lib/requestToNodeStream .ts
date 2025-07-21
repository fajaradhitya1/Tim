import { Readable } from "stream";

export async function requestToNodeStream(req: Request) {
  const buffer = Buffer.from(await req.arrayBuffer());

  const readable = new Readable();
  readable._read = () => {}; // noop
  readable.push(buffer);
  readable.push(null);

  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: req.url,
  });
}
