export class Constants
{
    public static lang: string;

    /** Text */
    public static wait: string;
    public static errors: string;
    public static fatalErrorMsg: string;
    public static warningTitle: string;
    public static errorTitle: string;
    public static changesSavedText: string;
    public static changesNotSavedText: string;
    public static cannotGoToSubForm: string;
    public static saveBeforeAttach: string;
    public static loadData: string;
    public static isDelete: string;
    public static isExitApp: string;
    public static loadingFile: string;
    public static maxLengthForField: string;
    public static search: string;
    public static searchError: string;
    public static scrollLoadingText: string;
    public static cameraError: string;
    public static filterBy: string;
    public static sortBy: string;
    public static all: string;
    public static loadingData: string;

    /**Buttons text */
    public static btnTitle: string;
    public static ok: string;
    public static cancel: string;
    public static defaultMsgTitle: string;
    public static editBtnText: string;
    public static deleteBtnText: string;
    public static addNewBtnText: string;
    public static saveBtnText: string;
    public static saveAndCont: string;
    public static cancelAndCont: string;
    public static addAttach: string;
    public static openBtnText: string;
    public static changeBtnText: string;
    public static textPlaceholder: string;
    public static approveReadOnly: string;
    public static approveEditText: string;
    public static camera: string;
    public static files: string;
    public static photoGalery: string;
    /**Style  */
    public static dirByLang: string;
    public static dirOpposite: string;

    /** Validation errors */
    public static decimalValidErr: string;
    public static numberValidErr: string;
    public static lengthValidErr: string;

    public static setRtlTranslations() 
    {
        Constants.wait = "אנא המתן...";
        Constants.errors = 'דו"ח שגיאות';
        Constants.fatalErrorMsg = "ארעה תקלה אנא פנה למנהל המערכת: \n";
        Constants.warningTitle = "אזהרה";
        Constants.errorTitle = "שגיאה";
        Constants.changesSavedText = "הנתונים נשמרו בהצלחה!";
        Constants.changesNotSavedText = "ישם שינויים שלא נשמרו. להמשיך?";
        Constants.cannotGoToSubForm = "לא ניתן לבצע את הפעולה.אנא הכנס נתונים תחילה.";
        Constants.saveBeforeAttach = "ישנם שינויים שלא נשמרו. אנא שמור את הדיווח לפני צרוף נספחים.";
        Constants.loadData = "טוען נתונים...";
        Constants.isDelete = "מחיקה?";
        Constants.isExitApp = "האם אתה בטוח שברצונך לצאת מהמערכת?";
        Constants.maxLengthForField = 'מספר התוים המקסימלי עבור השדה הוא: ';
        Constants.search = "חפש";
        Constants.scrollLoadingText = "טוען רשומות...";
        Constants.cameraError = "פתיחת מצלמה נכשלה";
        Constants.filterBy = "הצג ";
        Constants.sortBy = "מיין לפי";
        Constants.all = "הכל";
        Constants.loadingData="טוען נתונים...";


        Constants.btnTitle = "היכנס";
        Constants.ok = "אישור";
        Constants.cancel = "ביטול";
        Constants.defaultMsgTitle = "הודעה";
        Constants.editBtnText = "ערוך";
        Constants.deleteBtnText = "מחק";
        Constants.addNewBtnText = "חדש";
        Constants.saveBtnText = "שמור";
        Constants.saveAndCont = "שמור והמשך";
        Constants.cancelAndCont = "המשך ללא שמירה";
        Constants.addAttach = "נספח חדש";
        Constants.loadingFile = "מעלה את הקובץ...";
        Constants.openBtnText = "פתח";
        Constants.changeBtnText = "שנה";
        Constants.searchError = "לא הוגדרו שדות חיפוש";
        Constants.camera = "מצלמה";
        Constants.files = "קבצים";
        Constants.photoGalery = "גלריית תמונות";

        
        Constants.textPlaceholder = "הכנס טקסט";
        Constants.approveReadOnly = "קריאה בלבד";
        Constants.approveEditText = "עריכה";
        Constants.dirByLang = "rtl";
        Constants.dirOpposite = "ltr";

        Constants.decimalValidErr = "דיוק עשרוני שגוי";
        Constants.numberValidErr = "אנא הכנס ספרות בלבד";
        Constants.lengthValidErr = 'מספר תוים מקסימלי עבור השדה הוא: ';
    }

    public static setLtrTranslations()
    {
        Constants.wait = "Please wait...";
        Constants.errors = "Error report";
        Constants.fatalErrorMsg = "An error Occurred. Please contact your system administrator: \n";
        Constants.warningTitle = "Warning";
        Constants.errorTitle = "Error";
        Constants.changesSavedText = "Your changes were successfully saved!";
        Constants.changesNotSavedText = "Some changes were not saved. Continue?";
        Constants.cannotGoToSubForm = "The operation could not be executed. Please enter data first.";
        Constants.saveBeforeAttach = "Some changes were not saved. Please save the report before adding an attachment.";
        Constants.loadData = "Loading data...";
        Constants.isDelete = "Delete?";
        Constants.isExitApp = "Are you sure you want to exit the application?";
        Constants.loadingFile = "Uploading the file...";
        Constants.maxLengthForField = 'Maximum length for this field is: ';
        Constants.search = " Search";
        Constants.searchError = "No search fields defined"
        Constants.scrollLoadingText = "Loading more data...";
        Constants.cameraError = "Failed to open camera";
        Constants.filterBy = "Filter ";
        Constants.sortBy = "Sort by";
        Constants.all = "All";
        Constants.loadingData="Loading data...";

        Constants.ok = "OK";
        Constants.cancel = "Cancel";
        Constants.defaultMsgTitle = "Message";
        Constants.editBtnText = "Edit";
        Constants.deleteBtnText = "Delete";
        Constants.addNewBtnText = "Add new";
        Constants.saveBtnText = "Save";
        Constants.saveAndCont = "Save and continue";
        Constants.cancelAndCont = "Continue without saving";
        Constants.addAttach = "Attach file";
        Constants.openBtnText ="Open";
        Constants.changeBtnText = "Change";
        Constants.camera = "Camera";
        Constants.files = "Files";
        Constants.photoGalery = "Photo Galery";

        Constants.textPlaceholder = "Enter text";
        Constants.approveReadOnly = "Read only";
        Constants.approveEditText = "Edit";
        Constants.dirByLang = "ltr";
        Constants.dirOpposite = "rtl";

        Constants.decimalValidErr = "Wrong decimal precision";
        Constants.numberValidErr = "Digits only";
        Constants.lengthValidErr = "Maximum length for field is: ";
    }
}



