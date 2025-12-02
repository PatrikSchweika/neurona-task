import {Diagnosis} from "@/src/graphql/types/diagnosis";

export interface PatientListItem {
    __typename: 'PatientListItem'
    id: number
    name: string
    age: number
    lastDiagnosis?: Diagnosis
}

export interface PatientDetail {
    __typename: 'PatientDetail'
    id: number
    name: string
    age: number
    diagnoses: Diagnosis[]
}