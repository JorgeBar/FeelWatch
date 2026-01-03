
export function changeLocale(req, res) {
    const locale = req.params.locale;

    const allowedLocales = ['en', 'es', 'fr'];
    if (!allowedLocales.includes(locale)) {
        return res.status(400).json({
            success: false,
            message: 'Idioma no soportado'
        });
    }

    res.cookie('feelwatch-locale', locale, {
        maxAge: 30*24*60*60*1000,
        httpOnly: true
    });

    res.json({
        success: true,
        message: 'Idioma actualizado',
        locale
    });
}