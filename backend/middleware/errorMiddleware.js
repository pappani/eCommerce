// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

// custom error handler
const notFound = (req, res, next) => {
    const error = new Error("Non Trovato");
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export { notFound, errorHandler }