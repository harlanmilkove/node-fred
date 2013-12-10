var fred = require('../lib/fred')('f75edf02cf8bbcbf62a7cd8f88488b31')
var should = require('should')

describe('Categories', function() {
  describe('/fred/category', function() {
    it('Returns a valid category', function(done) {
      fred.category(1, function(err, category) {
        category.should.have.property('id', 1)
        category.should.have.property('name')
        category.should.have.property('parent_id')

        done(err)
      })
    })

    it('Errors on a non-existant category', function(done) {
      fred.category(123456789, function(err, category) {
        should.exist(err)
        err.should.be.an.instanceof(Error)
        should.not.exist(category)

        done()
      })
    })
  })

  describe('/fred/category/children', function() {
    it('Returns children', function(done) {
      fred.category.children(13, function(err, children) {
        children.should.be.an.instanceof(Array)
        done(err)
      })
    })
  })

  describe('/fred/category/related', function() {
    it('Returns related categories', function(done) {
      fred.category.related(13, function(err, relatedCategories) {
        relatedCategories.should.be.an.instanceof(Array)
        done(err)
      })
    })
  })
})
