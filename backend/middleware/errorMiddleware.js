const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // طباعة الخطأ في الكونسول للمساعدة في تصحيح الأخطاء
  
    let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    
    // معالجة أخطاء التحقق من Mongoose
    if (err.name === "ValidationError") {
      statusCode = 400;
    }
  
    // معالجة خطأ عدم العثور على البيانات
    if (err.name === "CastError") {
      statusCode = 404;
    }
  
    res.status(statusCode).json({
      success: false,
      message: err.message || "Something went wrong!",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  module.exports = { errorHandler };
  