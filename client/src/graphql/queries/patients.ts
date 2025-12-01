"use client";

import { useQuery } from "@apollo/client/react";
import { PatientDetail, PatientListItem } from "@/src/graphql/types/patient";
import { gql, TypedDocumentNode } from "@apollo/client";

type PatientsQuery = {
    patients: PatientListItem[]
}

type PatientsQueryVariables = Record<string, never>

const PATIENTS_QUERY: TypedDocumentNode<PatientsQuery, PatientsQueryVariables> = gql`
    query Patients {
      patients {
        id
        name
        age
        lastDiagnosis {
          id
          date
          description
          imageUrl
        }
      }
    }
`

export const usePatients = () => {
    return useQuery(PATIENTS_QUERY)
}

type PatientQuery = {
    patient: PatientDetail
}

type PatientQueryVariables = {
    patientId: number
}

const PATIENT_QUERY: TypedDocumentNode<PatientQuery, PatientQueryVariables> = gql`
    query Patient($patientId: Int!) {
      patient(patientId: $patientId) {
        id
        name
        age
        diagnoses {
          id
          date
          description
          imageUrl
        }
      }
    }
`

export const usePatient = (patientId: number) => {
    return useQuery(PATIENT_QUERY, { variables: { patientId } })
}