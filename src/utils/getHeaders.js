import HmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import MD5 from 'crypto-js/md5'
import qs from 'qs'

const calcUrl = config => {
    const deepConfig = JSON.parse(JSON.stringify(config))

    if (!deepConfig.url.startsWith('http')) deepConfig.url = deepConfig.baseURL + deepConfig.url

    if (deepConfig.method === 'get') {
        return `${deepConfig.url}?${qs.stringify(deepConfig.params)}`
    }
    return deepConfig.url
}

export const calcHeaders = (config = {}) => {
    const timeStamp = Date.now()
    const caKey = '28778826534697375418351580924221'
    const secret = 'HGXimfS2hcAeWbsCW19JQ7PDasYOgg1lY2UWUDVX8nNmwr6aSaFznnPzKrZ84VY1'

    const contentMd5 = config.data ? Base64.stringify(MD5(JSON.stringify(config.data))) : ''
    const stringToSigned = `${config.method.toUpperCase()}\n${calcUrl(
        config
    )}\n${timeStamp}\n${contentMd5}`
    const signature = Base64.stringify(HmacSHA256(stringToSigned, secret))
    const { userId = '', jwt = '' } = localStorage
    const { client = 0, version = 0 } = config.data || config.params || {}

    config.headers['Content-Type'] = 'application/json'
    config.headers['X-ITOUCHTV-Ca-Key'] = caKey
    config.headers['X-ITOUCHTV-Ca-Timestamp'] = timeStamp
    config.headers['X-ITOUCHTV-Ca-Signature'] = signature
    if (client) config.headers['X-ITOUCHTV-CLIENT'] = client
    if (version) config.headers['X-ITOUCHTV-APP-VERSION'] = version
    if (userId) config.headers['X-ITOUCHTV-USER-ID'] = userId
    if (jwt) config.headers['Authorization'] = `Bearer ${localStorage.jwt}`
    config.headers['X-ITOUCHTV-DEVICE-ID'] = 'IMEI_0'
    config.headers['X-ITOUCHTV-BRANCH'] = 'mj1166'
    config.headers['X-ITOUCHTV-PLATFORM-PK'] = '910099'
}
