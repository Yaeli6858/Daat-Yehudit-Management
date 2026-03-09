// src/validation/common.js
import * as yup from 'yup';

// =======================
// שדות בסיסיים שחוזרים בכל הטפסים
// =======================
export const nameValidation = yup
  .string()
  .required("שדה חובה")
  .min(2, "חייב להיות לפחות 2 תווים");

export const emailValidation = yup
  .string()
  .email("כתובת אימייל לא חוקית")

export const phoneValidationReq = yup
  .string()
  .matches(/^\d+$/, "חייב להיות מספרים בלבד")
  .min(7, "מספר קצר מדי")
  .max(10, "מספר ארוך מדי")
  .required("שדה חובה");

  export const phoneValidationOpt = yup
  .string()
  .matches(/^\d+$/, "חייב להיות מספרים בלבד")
  .min(7, "מספר קצר מדי")
  .max(10, "מספר ארוך מדי")
  .notRequired();

export const idValidationReq = yup
  .string()
  .matches(/^\d{9}$/, "תעודת זהות לא חוקית")
  .required("שדה חובה");

  export const idValidationOpt = yup
  .string()
  .matches(/^\d{9}$/, "תעודת זהות לא חוקית")
  .notRequired();

export const addressValidation = yup
  .string()
  .min(5, "כתובת קצרה מדי")
  .notRequired();

export const bankNameValidation = yup
  .string()
  .notRequired(); 

export const branchNumberValidation = yup
  .string()
  .matches(/^\d+$/, "מספר סניף לא חוקי")
  .notRequired();

export const accountNumberValidation = yup
  .string()
  .matches(/^\d+$/, "מספר חשבון לא חוקי")
  .notRequired();


//פרטי תרומה
export const donationValidationSchema = yup.object().shape({
  AmountValidation: yup
    .number()
    .typeError("חייב להיות מספר")
    .positive("חייב להיות מספר חיובי")
    .test(
      "all-or-none",
      "יש למלא את כל השדות אם אחד מהם מולא",
      function(value) {
        const { date, frequency, duration } = this.parent;
        const filledAny = value || date || frequency || duration;
        const allFilled = value && date && frequency && duration;
        return !filledAny || allFilled;
      }
    ),
  dateValidation: yup
    .date()
    .typeError("תאריך לא חוקי")
    .test(
      "all-or-none",
      "יש למלא את כל השדות אם אחד מהם מולא",
      function(value) {
        const { donationAmount, frequency, duration } = this.parent;
        const filledAny = donationAmount || value || frequency || duration;
        const allFilled = donationAmount && value && frequency && duration;
        return !filledAny || allFilled;
      }
    ),
  frequencyValidation: yup
    .string()
    .oneOf(["once", "monthly"], "תדירות לא חוקית")
    .test(
      "all-or-none",
      "יש למלא את כל השדות אם אחד מהם מולא",
      function(value) {
        const { donationAmount, date, duration } = this.parent;
        const filledAny = donationAmount || date || value || duration;
        const allFilled = donationAmount && date && value && duration;
        return !filledAny || allFilled;
      }
    ),
  durationValidation: yup
    .number()
    .typeError("חייב להיות מספר")
    .positive("חייב להיות מספר חיובי")
    .test(
      "all-or-none-and-frequency",
      "יש למלא את כל השדות אם אחד מהם מולא, ומשך ההוראה חובה רק אם תדירות חודשית",
      function(value) {
        const { donationAmount, date, frequency } = this.parent;
        const filledAny = donationAmount || date || frequency || value;
        const allFilled = donationAmount && date && frequency && value;

        // אם אחד השדות מולא, כל השדות חייבים
        if (filledAny && !allFilled) return false;

        // אם frequency = "monthly", duration חייב להיות מולא
        if (frequency === "monthly" && !value) return false;

        return true;
      }
    ),
});

// =======================
// וולידציות לחוב
// =======================

export const dueDateValidation = yup
  .date()
  .typeError("תאריך לא חוקי")
  .test(
    "after-borrow-date",
    "תאריך פירעון לא יכול להיות לפני תאריך ההלוואה",
    function (value) {
      const { dateBorrowed } = this.parent;
      if (!value || !dateBorrowed) return true;
      return new Date(value) >= new Date(dateBorrowed);
    }
  )
  .required("שדה חובה");// תאריך פירעון

  export const borrowDateValidation = yup
  .date()
  .typeError("תאריך לא חוקי")
  .required("שדה חובה"); // תאריך הלוואה

export const amountValidation = yup
  .number()
  .transform((value, originalValue) =>
    originalValue === "" ? undefined : value
  )
  .typeError("חייב להיות מספר")
  .positive("חייב להיות מספר חיובי")
  .required("שדה חובה");


export const descriptionValidation = yup
  .string()
  .required("שדה חובה")
  .min(2, "חייב להיות לפחות 2 תווים"); // תיאור החוב
export const debtTypeValidation = yup
  .string()
  .oneOf(["taken","given"], "סוג חוב לא חוקי")
  .required("שדה חובה"); // סוג חוב
export const paidValidation = yup.boolean(); // הוספתי גם לשדה paid אם תצטרכי
