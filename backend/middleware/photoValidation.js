const { body } = require("express-validator");

const photoInsertionValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatorio")
            .isString()
            .withMessage("O título é obrigatorio")
            .isLength({ min: 3 })
            .withMessage("O título precisa ter no mínimo 3 caracteres"),
        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatoria");
            }
            return true;
        }),
    ];
};

const photoUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    ];
};

module.exports = {
    photoInsertionValidation,
    photoUpdateValidation,
};
