import { body } from "express-validator"

export const driverRouteValidator={
    driver:{
        signUp:[
            body('password').isLength({ min: 8 }).withMessage("password must have at least 8 characters."),
            body("email").isEmail().withMessage("Invalid email address."),
            body("firstname").isLength({min:3 }).withMessage("firstname is required"),
            body("lastname").isLength({min:3 }).withMessage("lastname is required"),
            body('contact').not().isEmpty().trim().escape().withMessage("contact is required"),
            body('password_confirmation').custom((value, { req }) => {
                if (value !== req.body.password) {
                throw new Error('password_confirmation does not match password');
                }
                return true;
            }),
        ]
    },
    vehicle:{
        create:[
            body("make").not().isEmpty().withMessage("make is required"),
            body("year").not().isEmpty().withMessage("year is required"),
            body("color").not().isEmpty().withMessage("color is required"),
            body("model").not().isEmpty().withMessage("model is required"),
            body("capacity").not().isEmpty().withMessage("capacity is required"),
            body("vehicle_technical_certificate").not().isEmpty().withMessage("vehicle_technical_certificate is required"),
            body("vehicle_insurance_registration").not().isEmpty().withMessage("vehicle_insurance_registration is required"),
        ]
    },
    documents:{
        create:[
            body("personal_id").not().isEmpty().withMessage("personal_id is required"),
            body("drivers_license").not().isEmpty().withMessage("drivers_license is required"),
            body("profile_photo").not().isEmpty().withMessage("profile_photo is required"),
            body("background_check").not().isEmpty().withMessage("background_check is required"),
        ]
    }
}

