


export enum Language {
  AR = 'ar',
  EN = 'en',
  FR = 'fr',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTOMATIC = 'automatic',
}

export interface Module {
  id: string;
  name: string;
  coeff: number;
  credits: number;
  grade: number;
  // For modal form state, not necessarily stored in final module data after calculation
  tdGrade?: string; // Stored as string from input
  tpGrade?: string;
  examGrade?: string;
  tdEnabled: boolean;
  tpEnabled: boolean;
  examEnabled: boolean;
}

export interface StoredModuleData { // What's actually stored (without temporary form fields)
    id: string;
    name: string;
    coeff: number;
    credits: number;
    grade: number; // The calculated grade
    // Original input values that led to 'grade' could be stored if needed for editing,
    // For simplicity, we'll re-infer them or have user re-enter on edit if not perfectly reconstructing.
    // Or, store the raw inputs that were used if complex editing is required.
    // For now, assume re-entry or simple grade.
}


export interface SemesterResult {
  average: number;
  credits: number; // Earned credits for the semester
  remarkKey: string;
}

export interface AnnualResult {
  average: number;
  credits: number; // Total earned credits for the year
  status: {
    textKey: string;
    class: string; // Tailwind class for styling
  };
}

export interface SimpleCalculationMethod {
    id: string;
    type: 'simple';
    label: string;
    weights: {
        exam: number;
        continuous: number;
    };
}

export interface ComplexCalculationMethod {
    id:string;
    type: 'complex';
    label: string;
    isCustom?: boolean;
    weights: {
        td: number;
        tp: number;
        exam: number;
    };
}

export type CalculationMethod = SimpleCalculationMethod | ComplexCalculationMethod;


export interface AppSettings {
  language: Language;
  theme: Theme;
  calculationMethodId: string;
  customCalculationMethods: ComplexCalculationMethod[];
  requiredCreditsForDebt: number; // e.g., 30 or 45
  saveSettingsEnabled: boolean;
}

export interface AppState extends AppSettings {
  modules: StoredModuleData[];
  s1AvgText: string;
  s1CreditsText: string;
  s2AvgText: string;
  s2CreditsText: string;
}

export interface Translations {
  [key: string]: string;
}

export interface LanguagePack {
  [Language.AR]: Translations;
  [Language.EN]: Translations;
  [Language.FR]: Translations;
}

export type PageId = 'main' | 'semester-calculator' | 'annual-calculator' | 'settings';

export type ModalType = null | 'contact' | 'module' | 'result' | 'statement' | 'confirm' | 'error' | 'weights' | 'addCustomMethod' | 'success' | 'privacy' | 'dataManagement' | 'annualInfo';

export interface ModuleFormData {
  id?: string;
  name: string;
  coeff: string;
  credits: string;
  tdGrade?: string;
  tpGrade?: string;

  examGrade?: string;
  tdEnabled: boolean;
  tpEnabled: boolean;
  examEnabled: boolean;
  tdWeight?: number;
  tpWeight?: number;
  examWeight?: number;
}


export interface ResultModalPayload {
  titleKey: string;
  isAnnual?: boolean;
  average?: number;
  credits?: number; // Earned credits for semester, or total for annual
  totalPossibleCredits?: number; // 30 for semester, 60 for annual
  remarkKey?: string; // For semester
  status?: { textKey: string; class: string }; // For annual
}

export interface ErrorModalPayload {
    titleKey?: string;
    messageKey: string;
}

export interface SuccessModalPayload {
    titleKey: string;
    messageKey: string;
}

export interface ConfirmModalPayload {
  messageKey: string;
  onConfirm: () => void;
  titleKey?: string;
}

export interface ActiveModalState {
  type: ModalType;
  payload?: ResultModalPayload | ConfirmModalPayload | ErrorModalPayload | ModuleFormData | SuccessModalPayload;
}