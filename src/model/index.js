class BaseModel {
  constructor(data, message) {
    this.message = null;
    this.data = null;
    if (typeof data === "string") {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
    return this.returnData();
  }
  returnData() {
    let modelMsg = Object.assign({}, { data: this.data, error: this.error });
    return modelMsg;
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.error = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.error = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
