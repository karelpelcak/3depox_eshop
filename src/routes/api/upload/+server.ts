import { promises as fs } from 'fs';
import path from 'path';
import formidable, { File } from 'formidable';
import type { RequestHandler } from '@sveltejs/kit';
import { Readable } from 'stream';

export const POST: RequestHandler = async ({ request }) => {
  const form = formidable({ multiples: false });
  const externalPath = '/mnt/external/uploads';

  // Convert SvelteKit's request to a Node.js IncomingMessage
  const incomingMessage = new Readable() as any;
  incomingMessage.headers = request.headers;
  incomingMessage._read = () => {};
  incomingMessage.push(Buffer.from(await request.arrayBuffer()));
  incomingMessage.push(null);

  return new Promise((resolve, reject) => {
    form.parse(incomingMessage, async (err, fields, files) => {
      if (err) {
        resolve(new Response(JSON.stringify({ message: 'Error parsing the file.' }), { status: 500 }));
        return;
      }

      const fileArray = files.fileToUpload as File[];
      if (!fileArray || fileArray.length === 0) {
        resolve(new Response(JSON.stringify({ message: 'No file uploaded.' }), { status: 400 }));
        return;
      }

      const file = fileArray[0];
      const uploadPath = path.join(externalPath, file.newFilename);

      try {
        await fs.rename(file.filepath, uploadPath);
        resolve(new Response(JSON.stringify({ message: 'File uploaded successfully.' }), { status: 200 }));
      } catch (err) {
        resolve(new Response(JSON.stringify({ message: 'Error saving the file.' }), { status: 500 }));
      }
    });
  });
};
