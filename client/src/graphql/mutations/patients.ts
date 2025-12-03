import {gql, TypedDocumentNode} from "@apollo/client";
import {Mutation, MutationAddPatientArgs} from "@/src/graphql/__generated__/graphql";

export const ADD_PATIENT: TypedDocumentNode<Pick<Mutation, 'addPatient'>, MutationAddPatientArgs> = gql`
    mutation AddPatient($patient: PatientCreateInput!) {
        addPatient(patientDto: $patient) {
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



// todo: mutation: update patient diagnoses