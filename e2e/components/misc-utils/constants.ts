export class Constants {
  static readonly MAX_RETRY_ATTEMPTS = 3;
  static readonly EMPTY_STRING = "";
  static readonly DUMMY_PATH = "/dummy";
  static readonly none = "None";
  static readonly MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  static readonly server = {
    host: "192.168.1.1",
    user: "mcesar",
    pass: "mcesar",
  };
  static readonly separators = {
    comma: ",",
    semiColon: ";",
    apostrophe: "'",
    pipe: "|",
  };

  static readonly httpStatusCodes = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
  };

  static readonly jsScripts = {
    scrollIntoView: "arguments[0].scrollIntoView();",
    scrollToBottom: "window.scrollTo(0, document.body.scrollHeight)",
    windowClose: "window.close();",
    click: "arguments[0].click();",
  };

  static readonly colorCode = {
    red: "rgba(189, 32, 46, 1)",
  };
}
