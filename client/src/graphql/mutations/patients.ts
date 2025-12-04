import {gql, TypedDocumentNode} from "@apollo/client";
import {Mutation, MutationAddPatientArgs, MutationUpdateDiagnosesArgs} from "@/src/graphql/__generated__/graphql";

export const ADD_PATIENT: TypedDocumentNode<Pick<Mutation, 'addPatient'>, MutationAddPatientArgs> = gql`
    mutation AddPatient($patientDto: PatientCreateInput!) {
        addPatient(patientDto: $patientDto) {
            id
            name
            age
            diagnoses {
                id
                date
                title
                description
                imageUrl
            }
        }
    }
`

export const UPDATE_DIAGNOSES: TypedDocumentNode<Pick<Mutation, 'updateDiagnoses'>, MutationUpdateDiagnosesArgs> = gql`
    mutation UpdateDiagnoses($diagnoses: [DiagnosisUpdateInput!]!, $patientId: Int!) {
        updateDiagnoses(diagnoses: $diagnoses, patientId: $patientId) {
            id
            date
            title
            description
            imageUrl
        }
    }
`