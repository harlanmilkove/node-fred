var fred = require('../lib/fred')('f75edf02cf8bbcbf62a7cd8f88488b31')
var should = require('should')

describe('Series', function() {
  describe('/fred/series', function() {
    it('Returns a valid series', function(done) {
      fred.series('DGS10', function(err, series) {
        series.should.have.property('realtime_start')
        series.should.have.property('seriess')

        done(err)
      })
    })

    it('Errors on bad input', function(done) {
      fred.series('HEYBOOBOO', function(err, series) {
        should.exist(err)
        err.should.be.an.instanceof(Error)
        should.not.exist(series)

        done()
      })
    })
  })
})
