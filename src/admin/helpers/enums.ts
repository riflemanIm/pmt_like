/**
* Список ролей
*/
export enum AccountRole {
    unknown = 0,
    patient = 1,
    agent = 2,
    doctor = 3,
    operator = 4,
    admin = 5,
    interpreter = 6,
    netAdmin = 7,
    netMarketer = 8,
    insuranceAgent = 9
}

export enum Feature {
    mobile = "mobile",
    web = "web",
    payments = "payments",
    chat = "chat"
}

/**
* Источник регистрации
*/
export enum RegistrationSource {
    web = 1,
    application = 2,
    admin = 3,
    mmk = 4,
    soap = 5,
    esia = 6,
    integrator = 7
}

/**
* Возрастная группа
*/
export enum AgeGroup {
    /**
    * Дети
    */
    Child = 0,
    /**
    * Взрослые
    */
    Adult = 1,
    /**
    * Все
    */
    Any = 3,
    /**
    * Неизвестно
    */
    Unknown = 99,
}

/**
* Пол
*/
export enum Gender {
    /**
    * Мужской
    */
    Male = "M",
    /**
    * Женский
    */
    Female = "F"
}

export enum GenderNum {
    /**
    * Мужской
    */
    Male = 0,
    /**
    * Женский
    */
    Female = 1
}

/**
* Способ уведомления
*/
export enum NotificationType {
    None = 0,
    Sms = 1,
    Email = 2,
    ExternalService = 3,
    FirebasePush = 4,
    WhatsApp = 5,
    VoiceCall = 6,
    Telegram = 7,
    TelegramBot = 8
}

/**
* Тип уведомления о событии
*/
export enum NotificationRecordType {
    /**
    * Неизвестно, используется по умолчанию
    */
    Unknown = -1,

    /**
    * Запись на прием
    */
    Visit = 1,

    /**
    * Запись ММК
    */
    Mmk = 2,

    /**
    * Статус инвойса
    */
    Invoice = 3,

    /**
    * Предоставление доступа к ММК
    */
    GrantMmkAccess = 4,

    /**
    * Нотификация сервисам записи на прием
    */
    ExternalServiceNotification = 5,

    /**
    * Подтверждение действия
    */
    Confirmation = 6,

    /**
    * Вызов врача на дом
    */
    DoctorCall = 7,

    /**
    * Заявка на запись в расписание
    */
    PlanningRequest = 8,

    /**
    * Уведомление об онлайн-консультации
    */
    OnlineConsultation = 9,

    /**
    * Уведомление о смене пароля
    */
    PasswordChange = 10,

    /**
    * Уведомление об ошибке
    */
    ApplicationError = 11,

    /**
    * Уведомление о лимите
    */
    LicenseLimit = 12,

    /**
    * Уведомление администратору
    */
    External = 13,

    /**
    * Уведомление администратору
    */
    AdminNotify = 14,

    /**
    * Отзыв о приложении
    */
    ApplicationReview = 15,
    /**
    * Подтверждение записи в расписание (отправка в клинику)
    */
    PlanningConfirmation = 16
}

export enum EventType {
    Unknown = -1,
    MmkApproved = 1,
    MmkNotApproved = 2,
    NewVisit = 3,
    UpdateVisit = 4,
    CancelVisit = 5,
    NetBlock = 7,
    InvoicePaid = 8,
    NewInvoice = 9,
    AcceptVisit = 10,
    SendSms = 12,
    VisitAwaitingOfConfirmation = 13,
    NewMmkCreatedForSpecifiedEmail = 14,
    ExternalServiceNotification = 15,
    InternalServerError = 16,

    ChangePassword = 17,
    AuthorizationAsDoctor = 18,
    ChangeEmailAddress = 19,
    ConfirmNewAccount = 20,
    ChangePhoneNumber = 21,
    Authentication = 22,
    ConfirmMmkRegistration = 23
}

export const RecordTypeEvents: Readonly<Record<NotificationRecordType, EventType[]>> = {
    [NotificationRecordType.Unknown]: [],
    [NotificationRecordType.Visit]: [EventType.NewVisit, EventType.UpdateVisit, EventType.CancelVisit],
    [NotificationRecordType.Mmk]: [EventType.MmkApproved, EventType.MmkNotApproved],
    [NotificationRecordType.Invoice]: [EventType.InvoicePaid, EventType.NewInvoice],
    [NotificationRecordType.Confirmation]: [EventType.AuthorizationAsDoctor, EventType.ChangeEmailAddress, EventType.ConfirmNewAccount, EventType.ChangePhoneNumber, EventType.Authentication, EventType.ChangePassword, EventType.ConfirmMmkRegistration],
    [NotificationRecordType.GrantMmkAccess]: [EventType.NewMmkCreatedForSpecifiedEmail],
    [NotificationRecordType.ExternalServiceNotification]: [],
    [NotificationRecordType.DoctorCall]: [],
    [NotificationRecordType.PlanningRequest]: [],
    [NotificationRecordType.OnlineConsultation]: [],
    [NotificationRecordType.PasswordChange]: [EventType.ChangePassword],
    [NotificationRecordType.ApplicationError]: [],
    [NotificationRecordType.LicenseLimit]: [],
    [NotificationRecordType.External]: [],
    [NotificationRecordType.AdminNotify]: [],
    [NotificationRecordType.ApplicationReview]: [],
    [NotificationRecordType.PlanningConfirmation]: []
};

export enum NotificationStatus {
    Created = 0,
    Sent = 1,
    Cancelled = 2,
    NotEnoughMoney = 10,
    NotificationCountLimitExceeded = 11,
    NotificationCostLimitExceeded = 12,
    ErrorWhileSending = 14,
    ErrorWhileVerifyingThePrice = 15,
    ForThisClinicYouCanNotSendSmsAboutVisitsToADoctor = 16,
    ForThisClinicYouCanNotSendSmsAboutEmkRecords = 17,
    ErrorWhileMovingToLog = 18
}

export enum PromoActionType {
    Action = 1,
    Appeal = 2,
    Personal = 3
}

export enum SettingValidator {
    string = 'string',
    bool = 'bool',
    int = 'integer',
    float = 'float',
    email = 'email',
    date = 'date'
}

export enum SpamReason {
    Registration = 1
}

export enum LicenseLimitType {
    /**
    * Регистрация MMK
    */
    RegisterMMK = 1,
    /**
    * Отправка СМС
    */
    SendSMS = 2
}

export enum ConfirmationCodeType {
    AuthorizationAsDoctor = 1,
    ChangeEmailAddress = 2,
    ConfirmNewAccount = 3,
    ChangePhoneNumber = 4,
    Authentication = 5,
    ChangePassword = 6,
    JoinTelegram = 7
}

export enum AppInstanceType {
    Firebase = 1,
    Pushed = 2,
    Telegram = 3
}

export const isNetRole = (roleType: AccountRole): boolean => {
    return roleType === AccountRole.netAdmin || roleType === AccountRole.netMarketer || roleType === AccountRole.operator;
}

export type LangCode = "rus" | "eng" | "fra";

export const notificationTypeNames = (t?: TranslationFunction, prefix?: string) => {
    const result = [];
    for (let nt = NotificationType.Sms; nt <= NotificationType.TelegramBot; nt++) {
        result.push({
            value: nt,
            label: getEnumName(NotificationType, nt, t, prefix) as string
        });
    }
    return result;
}

export const notificationRecordTypeNames = (t?: TranslationFunction, prefix?: string) => {
    const result = [];
    for (let nt = NotificationRecordType.Visit; nt <= NotificationRecordType.ApplicationReview; nt++) {
        result.push({
            value: nt,
            label: getEnumName(NotificationRecordType, nt, t, prefix)
        });
    }
    return result;
}

export const eventTypeNames = (t?: TranslationFunction, prefix?: string) => {
    const result = [];
    for (let nt = EventType.MmkApproved; nt <= EventType.ConfirmMmkRegistration; nt++) {
        if (!EventType[nt]) continue;
        result.push({
            value: nt,
            label: getEnumName(EventType, nt, t, prefix)
        });
    }
    return result;
}

export const notificationStatusNames = (t?: TranslationFunction, prefix?: string) => {
    const result = [];
    for (let nt = NotificationStatus.Created; nt <= NotificationStatus.ErrorWhileMovingToLog; nt++) {
        if (!NotificationStatus[nt]) continue;
        result.push({
            value: nt,
            label: getEnumName(NotificationStatus, nt, t, prefix)
        });
    }
    return result;
}

export type TranslationFunction = (key: string) => string;

export const getEnumName = (enumClass: any, value: any, t?: TranslationFunction, prefix?: string): string => {
    const valueIndex = Object.values(enumClass).indexOf(value);
    if (valueIndex === -1) return value;
    const key = Object.keys(enumClass)[valueIndex];
    if (!key) return key;
    return t ? t(`${prefix ? prefix + '.' : ''}${key}`) : key
}

export const listEnums = <T>(enumClass: any, t?: TranslationFunction, prefix?: string): { value: T, label: string }[] => {
    const values: { value: T, label: string }[] = [];
    const keys = Object.keys(enumClass);
    const isNumberValue = (keys.length > 1 && typeof enumClass[keys[keys.length / 2]] === "number");
    for (const key of (isNumberValue ? keys.slice(keys.length / 2) : keys)) {
        values.push({
            value: enumClass[key] as T,
            label: getEnumName(enumClass, enumClass[key], t, prefix)
        });
    }
    return values;
}