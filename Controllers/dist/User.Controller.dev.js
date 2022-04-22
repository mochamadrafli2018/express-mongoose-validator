"use strict";

var User = require('../Models/User.model');

module.exports = {
  find: function find(req, res) {
    var users;
    return regeneratorRuntime.async(function find$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(User.find());

          case 3:
            users = _context.sent;
            return _context.abrupt("return", res.status(200).send(users));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).send({
              message: _context.t0.message || 'some error ocurred while retrieving data.'
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  findById: function findById(req, res) {
    var user;
    return regeneratorRuntime.async(function findById$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(User.findById({
              _id: req.params.id
            }));

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            throw createError.NotFound('User not found');

          case 6:
            return _context2.abrupt("return", res.status(200).send(user));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);

            if (!(_context2.t0.kind === 'ObjectId')) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(404).send({
              message: 'data not found with id ' + req.params.id
            }));

          case 13:
            return _context2.abrupt("return", res.status(500).send({
              message: 'error retrieving data with id ' + req.params.id
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  findOneAndUpdate: function findOneAndUpdate(req, res) {
    console.log(req.body);
    User.findById({
      _id: req.params.id
    }).then(function (currentData) {
      var _ref = '',
          newName = _ref.newName,
          newEmail = _ref.newEmail,
          newPassword = _ref.newPassword,
          newGender = _ref.newGender,
          newRole = _ref.newRole,
          newUpdatedScreeningResult = _ref.newUpdatedScreeningResult;

      if (!req.body.name) {
        newName = currentData.name;
      }

      if (!req.body.email) {
        newEmail = currentData.email;
      }

      if (!req.body.password) {
        newPassword = currentData.password;
      }

      if (!req.body.gender) {
        newGender = currentData.gender;
      }

      if (!req.body.role) {
        newRole = currentData.role;
      }

      if (!req.body.updatedScreeningResult) {
        newUpdatedScreeningResult = currentData.updatedScreeningResult;
      }

      if (req.body.name) {
        newName = req.body.name;
      }

      if (req.body.email) {
        newEmail = req.body.email;
      }

      if (req.body.password) {
        newPassword = req.body.password;
      }

      if (req.body.gender) {
        newGender = req.body.gender;
      }

      if (req.body.role) {
        newRole = req.body.role;
      }

      if (req.body.updatedScreeningResult) {
        newUpdatedScreeningResult = req.body.updatedScreeningResult;
      }

      var newData = User({
        name: newName,
        email: newEmail,
        password: newPassword,
        gender: newGender,
        role: newRole,
        updatedScreeningResult: newUpdatedScreeningResult,
        _id: req.params.id
      });
      console.log(newData); // update with new data

      User.findByIdAndUpdate({
        _id: req.params.id
      }, newData, {
        "new": true
      }).then(function (updatedData) {
        console.log('success update data');
        return res.status(200).send(updatedData);
      })["catch"](function (err) {
        if (err.kind === 'Object_id') return res.status(404).send({
          message: 'data not found with _id ' + req.params._id
        });
        return res.status(500).send({
          message: 'error updating data with _id ' + req.params._id
        });
      });
    })["catch"](function (err) {
      if (err.kind === 'ObjectId') return res.status(404).send({
        message: 'data not found with id ' + req.params.id
      });
      return res.status(500).send({
        message: 'error retrieving data with id ' + req.params.id
      });
    });
  },
  findByIdAndRemove: function findByIdAndRemove(req, res) {
    try {
      User.findByIdAndRemove({
        _id: req.params.id
      }).then(function () {
        return res.status(200).send({
          message: 'data deleted successfully!'
        });
      });
    } catch (err) {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') return res.status(404).send({
        message: 'data not found with id ' + req.params.id
      });
      return res.status(500).send({
        message: 'could not delete data with id ' + req.params.id
      });
    }

    ;
  },
  removeAll: function removeAll(req, res) {
    User.remove({}).then(function () {
      return res.status(200).send({
        message: 'All data deleted successfully!'
      });
    })["catch"](function (err) {
      return res.status(500).send({
        message: 'Could not delete all data'
      });
    });
  }
};