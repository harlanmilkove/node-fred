var request = require('request')

var DEFAULT_FRED = {
  PROTOCOL: 'http://',
  HOST: 'api.stlouisfed.org',
  PATH: '/fred'
}

var Fred = function(apiKey) {
  if (!(this instanceof Fred)) {
    return new Fred(apiKey)
  }

  this._api = {
    protocol: DEFAULT_FRED.PROTOCOL,
    host: DEFAULT_FRED.HOST,
    path: DEFAULT_FRED.PATH,
    key: apiKey
  }

  this.category.children = Fred.prototype.category.children.bind(this)
  this.category.related = Fred.prototype.category.children.bind(this)
  this.series.observations = Fred.prototype.series.observations.bind(this)
}

Fred.prototype.category = function(categoryId, done) {
  request({
    uri: 'http://' + this._api.host + this._api.path + '/category',
    qs: {
      file_type: 'json',
      api_key: this._api.key,
      category_id: categoryId
    },
    json: true
  }, function(err, res, body) {
    if (err) return done(err)
    if (res.statusCode != 200) return done(new Error(body.error_message))

    done(null, body.categories[0])
  })
}

Fred.prototype.category.children = function(categoryId, done) {
  request({
    uri: this._api.protocol + this._api.host + this._api.path + '/category/children',
    qs: {
      file_type: 'json',
      api_key: this._api.key,
      category_id: categoryId
    },
    json: true
  }, function(err, res, body) {
    if (err) return done(err)
    if (res.statusCode != 200) return done(new Error(body.error_message))

    done(null, body.categories)
  })
}

Fred.prototype.category.related = function(categoryId, done) {
  request({
    uri: this._api.protocol + this._api.host + this._api.path + '/category/related',
    qs: {
      file_type: 'json',
      api_key: this._api.key,
      category_id: categoryId
    },
    json: true
  }, function(err, res, body) {
    if (err) return done(err)
    if (res.statusCode != 200) return done(new Error(body.error_message))

    done(null, body.categories)
  })
}

Fred.prototype.series = function(seriesId, done) {
  request({
    uri: this._api.protocol + this._api.host + this._api.path + '/series',
    qs: {
      file_type: 'json',
      api_key: this._api.key,
      series_id: seriesId
    },
    json: true
  }, function(err, res, body) {
    if (err) return done(err)
    if (res.statusCode != 200) return done(new Error(body.error_message))

    done(null, body)
  })
}

Fred.prototype.series.observations = function(seriesId, done) {
  request({
    uri: this._api.protocol + this._api.host + this._api.path + '/series/observations',
    qs: {
      file_type: 'json',
      api_key: this._api.key,
      series_id: seriesId
    },
    json: true
  }, function(err, res, body) {
    if (err) return done(err)
    if (res.statusCode != 200) return done(new Error(body.error_message))

    done(null, body)
  })
}

module.exports = Fred
