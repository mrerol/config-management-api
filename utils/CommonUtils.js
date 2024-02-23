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

  static checkTimestampConflict(currentTimestamp, newTimestamp) {
    if (currentTimestamp.toMillis() > newTimestamp._seconds * 1000) {
      throw new Error('Conflict: Document has been modified by another transaction.');
    }
  }

  static handleSuccess = (res, data) => {
    res.status(200).json({
       status: 'OK',
       data,
    });
 };

  static handleError = (res, error) => {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  };
}

export default CommonUtils;