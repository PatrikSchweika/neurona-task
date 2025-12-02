"use client";

import {gql, TypedDocumentNode} from "@apollo/client";
import {useMutation} from "@apollo/client/react";
import {Mutation, MutationAddPatientArgs} from "@/src/graphql/__generated__/graphql";

const ADD_PATIENT: TypedDocumentNode<Pick<Mutation, 'addPatient'>, MutationAddPatientArgs> = gql`
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

export const useAddPatient = () => {
    const [addPatient] = useMutation(ADD_PATIENT)

    return addPatient
}

// todo: mutation: update patient diagnoses