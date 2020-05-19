import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShortenUrlService from '@modules/urls/services/ShortenUrlService';
import FindUrlService from '@modules/urls/services/FindUrlService';

class UrlController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    if (!url)
      return response
        .status(400)
        .json({ status: 'error', message: 'Missing param: url' });

    const shortenUrlService = container.resolve(ShortenUrlService);
    const newUrl = await shortenUrlService.execute(url);

    return response.status(201).json({ newUrl });
  }

  public async getUrl(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const { shortUrl } = request.params;

    if (!shortUrl)
      return response
        .status(400)
        .json({ status: 'error', message: 'Missing param: url' });

    const findUrlService = container.resolve(FindUrlService);
    const url = await findUrlService.execute(shortUrl);

    return response.status(301).redirect(url);
  }
}

export default UrlController;
