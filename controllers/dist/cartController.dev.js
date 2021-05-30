"use strict";

var _product = _interopRequireDefault(require("../models/product"));

var _cart = _interopRequireDefault(require("../models/cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

getCart = function getCart(req, res) {
  var userId, cart;
  return regeneratorRuntime.async(function getCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.params.id;

          try {
            cart = _cart["default"].findOne({
              userId: userId
            });

            if (cart && cart.items.length > 0) {
              res.send(cart);
            } else {
              res.send(null);
            }
          } catch (error) {
            console.log("Getting cart error --" + error);
            res.status(500).send("Something went wrong.");
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

updateCart = function updateCart(req, res) {
  return regeneratorRuntime.async(function updateCart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  });
};

deleteCartProduct = function deleteCartProduct(req, res) {
  return regeneratorRuntime.async(function deleteCartProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }
  });
};