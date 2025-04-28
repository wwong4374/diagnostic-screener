export enum Domain {
  Depression = 'DEPRESSION',
  Mania = 'MANIA',
  Anxiety = 'ANXIETY',
  SubstanceUse = 'SUBSTANCE USE',
}

export enum Level2Assessment {
  Phq9 = 'PHQ-9',
  Asrm = 'ASRM',
  Assist = 'ASSIST',
}

export interface Question {
  questionId: string,
  domain: Domain,
}

export interface Answer {
  questionId: string;
  value: number;
}

export const DomainToScoreThreshold: Record<Domain, number> = {
  [Domain.Depression]: 2,
  [Domain.Mania]: 2,
  [Domain.Anxiety]: 2,
  [Domain.SubstanceUse]: 1,
};

export const DomainToLevel2Assessment: Record<Domain, Level2Assessment> = {
  [Domain.Depression]: Level2Assessment.Phq9,
  [Domain.Mania]: Level2Assessment.Asrm,
  [Domain.Anxiety]: Level2Assessment.Phq9,
  [Domain.SubstanceUse]: Level2Assessment.Assist,
};

export function isDomain(value: string): value is Domain {
  return Object.values(Domain).includes(value as Domain)
}
