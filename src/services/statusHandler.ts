/**
 * Status Handler - For handling network responses
 */

const statusHandler = (err: { response: { status: number } }) => {
  if (err.response) {
    switch (err.response.status) {
      case 401: {
        // 401: Bad token, please try again
        break;
      }
      default: {
        // default
      }
    }
  }
};

export default statusHandler;
