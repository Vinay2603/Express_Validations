const express = require("express")

const {body , validationResult}  = require("express-validator")

const router = express.Router()

const User = require("../modules/user")

router.post("/",
         body("first_name").isLength({min : 1}).withMessage("first name  is required"),
         body("last_name").isLength({min : 1}).withMessage("last name  is required"),
         body("email").isEmail().withMessage("email   is required"),
         body("pincode").isLength({min : 6 , max : 6}).withMessage(" pincode is required and  must be 6 digit"),
         body("age").isLength({min : 1 , max : 100 }).withMessage("age  is required"),
         body("gender").isLength({min : 3}).withMessage("gender  is required"),

         async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              let newErrors = errors.array().map(({ msg, param, location }) => {
                return {
                  [param]: msg,
                };
              });
              return res.status(400).json({ errors: newErrors });
            }
            try {
              const user = await User.create(req.body);
        
              return res.status(201).json({ user });
            } catch (e) {
              return res.status(500).json({ status: "failed", message: e.message });
            }
          }
        );
        
        module.exports = router;