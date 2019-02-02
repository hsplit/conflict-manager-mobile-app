export const getStatus = (api, token) => fetch(`${api}/mystatus`, { headers: { token } })
  .then(res => {
    if (!res.ok) {
      if (res.status === 423) {
        throw new Error('Access denied')
      }
      if (res.status === 500) {
        return res
      }
      throw new Error()
    }
    return res
  }).then(response => response.json())
