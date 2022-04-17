export default function makeExpressViewCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      requestBody: {
        ...req.body,
        ...req.params,
        ...req.query,
        user: req.user || null,
      },
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };

    controller(httpRequest)
      .then((httpResponse) => {
        //if succeed
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res.status(httpResponse.statusCode || 200).send(httpResponse);
      })
      .catch((errorObject) => {
        //if error
        //parsed error from errorResponse
        res.type('json');
        res.status(errorObject.statusCode || 500).send(errorObject);
      });
  };
}
