import {I18n} from 'i18n'
import path from 'node:path'


const __dirname = import.meta.dirname;


const i18n = new I18n({
    locales : ['en', 'es','fr'],
    directory: path.join( __dirname ,'..', 'locales'),
    defaultLocale: 'en',
    autoReload:true, 
    syncFiles:true,

})
 
export default i18n