import https from 'https'

export default ({$axios, $cookies}) => {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  const token = $cookies.get('Bearer')
  $axios.setHeader('Authorization', `Bearer ${token}`)
}

