import request from "../index"

const baseURL = "/qrcode"

export default {
  init: (qrcode) => {
    return request({
      url: `${baseURL}/init`,
      method: "POST",
      data: qrcode
    })
  }
}