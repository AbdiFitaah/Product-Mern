import { success } from "zod";

export const validate = (schema) => (req,res,next) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {
        const format = result.error.format();
        console.log(format)
        return res.status(400).json({
            success:false,
            massage:"Validation Valid",
            errors: Object.keys(format)
                .filter(field => field !== "_errors")
                .map(field => ({
                    field,
                    message: format[field]?._errors ?.[0] || " "
                }))
        })
    }
    next();
}