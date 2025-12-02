"use client";

// todo: mutation: add patient

import {gql, TypedDocumentNode} from "@apollo/client";
import {PatientDetail} from "@/src/graphql/types/patient";
import {useMutation} from "@apollo/client/react";

type AddPatientMutation = {
    addPatient: PatientDetail
}

type AddPatientMutationVariables = {
    patient: {
        name: string
        age: number
        diagnoses?: Array<{
            date: string
            title: string
            description: string
            imageUrl?: string
        }>
    }
}

const ADD_PATIENT: TypedDocumentNode<AddPatientMutation, AddPatientMutationVariables> = gql`
    mutation AddPatient($patient: PatientCreate!) {
        addPatient(patient: $patient) {
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