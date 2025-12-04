export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Diagnosis = {
  __typename: 'Diagnosis';
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type DiagnosisCreateInput = {
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type DiagnosisFilterInput = {
  and?: InputMaybe<Array<DiagnosisFilterInput>>;
  date?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  imageUrl?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DiagnosisFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type DiagnosisSortInput = {
  date?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageUrl?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type DiagnosisUpdateInput = {
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename: 'Mutation';
  addPatient: PatientDetail;
  updateDiagnoses: Array<Diagnosis>;
};


export type MutationAddPatientArgs = {
  patientDto: PatientCreateInput;
};


export type MutationUpdateDiagnosesArgs = {
  diagnoses: Array<DiagnosisUpdateInput>;
  patientId: Scalars['Int']['input'];
};

export type PatientCreateInput = {
  age: Scalars['Int']['input'];
  diagnoses: Array<DiagnosisCreateInput>;
  name: Scalars['String']['input'];
};

export type PatientDetail = {
  __typename: 'PatientDetail';
  age: Scalars['Int']['output'];
  diagnoses: Array<Diagnosis>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PatientListItem = {
  __typename: 'PatientListItem';
  age: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastDiagnosis: Maybe<Diagnosis>;
  name: Scalars['String']['output'];
};

export type PatientListItemFilterInput = {
  age?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<PatientListItemFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastDiagnosis?: InputMaybe<DiagnosisFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PatientListItemFilterInput>>;
};

export type PatientListItemSortInput = {
  age?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastDiagnosis?: InputMaybe<DiagnosisSortInput>;
  name?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename: 'Query';
  patient: PatientDetail;
  patients: Array<PatientListItem>;
};


export type QueryPatientArgs = {
  patientId: Scalars['Int']['input'];
};


export type QueryPatientsArgs = {
  order?: InputMaybe<Array<PatientListItemSortInput>>;
  where?: InputMaybe<PatientListItemFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type AddPatientMutationVariables = Exact<{
  patient: PatientCreateInput;
}>;


export type AddPatientMutation = { addPatient: { __typename: 'PatientDetail', id: number, name: string, age: number, diagnoses: Array<{ __typename: 'Diagnosis', id: number, date: unknown, title: string, description: string, imageUrl: string | null }> } };

export type UpdateDiagnosesMutationVariables = Exact<{
  diagnoses: Array<DiagnosisUpdateInput> | DiagnosisUpdateInput;
  patientId: Scalars['Int']['input'];
}>;


export type UpdateDiagnosesMutation = { updateDiagnoses: Array<{ __typename: 'Diagnosis', id: number, date: unknown, title: string, description: string, imageUrl: string | null }> };

export type PatientsQueryVariables = Exact<{ [key: string]: never; }>;


export type PatientsQuery = { patients: Array<{ __typename: 'PatientListItem', id: number, name: string, age: number, lastDiagnosis: { __typename: 'Diagnosis', id: number, date: unknown, title: string, description: string, imageUrl: string | null } | null }> };

export type PatientQueryVariables = Exact<{
  patientId: Scalars['Int']['input'];
}>;


export type PatientQuery = { patient: { __typename: 'PatientDetail', id: number, name: string, age: number, diagnoses: Array<{ __typename: 'Diagnosis', id: number, date: unknown, title: string, description: string, imageUrl: string | null }> } };
