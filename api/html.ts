import NotionPageToHtml from 'notion-page-to-html';
import { MissingIdError } from '../_errors/missing-id';

export const handler = async (request: NowRequest, response: NowResponse): Promise<void | NowResponse> => {
  try {
    const { id } = request.query;
    if (!id) throw new MissingIdError();

    const url = `https://notion.so/${id}`;
    const content = await NotionPageToHtml.convert(url);
    const { html } = content;
    
    console.log({
      html: encodeURIComponent(html)
    })

    // response.setHeader('Content-Type', 'text/plain');
    // response.status(200).send(encodeURIComponent(html));
    return html
  } catch (err) {
    throw err
    // switch (err.name) {
    //   case 'MissingIdError':
    //   case 'InvalidPageUrlError':
    //     return response.status(400).send(err.message);
    //   case 'NotionPageAccessError':
    //     return response.status(401).send(err.message);
    //   default:
    //     return response.status(500).send(err.message);
    // }
  }
};

export default handler
