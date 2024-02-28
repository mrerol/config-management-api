const detectDeviceType = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent.includes('mobile')) {
    req.deviceType = 'mobile';
  } else {
    req.deviceType = 'web';
  }
  next();
};

export default detectDeviceType;