export default function responseApi() {

  function response(res) {
    let msg = res.data.message
    let status = res.data.key
    let data = res.data.data
    if (status == "success") {
      return {
        status: 'success',
        data: data,
        msg: msg
      }
    } else if (status == "fail") {
      return {
        status: 'fail',
        msg: msg
      }
    } else if (status == "unauthenticated") {
      return {
        status: 'unauthenticated',
        msg: msg
      }
    } else if (status == "blocked") {
      return {
        status: 'blocked',
        msg: msg
      }
    } else if (status == "exception") {
      return {
        status: 'exception',
        msg: msg
      }
    }
  }

  return { response };
}
