class CommonUtils {

  static formatDate = (timestamp) => {
    const date = new Date(timestamp.toMillis());
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  static handleSuccess = (res, data) => {
    res.status(200).json({
      status: 'OK',
      data,
    });
    return;
  };

  static handleError = (res, error) => {
    console.error('Error:', error.message);
    if (error.message === 'conflict') {
      res.status(409).json({ message: 'conflict' });
      return;
    }
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  };
}

export default CommonUtils;