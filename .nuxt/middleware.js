const middleware = {}

middleware['check-permission'] = require('..\\middleware\\check-permission.js')
middleware['check-permission'] = middleware['check-permission'].default || middleware['check-permission']

export default middleware
