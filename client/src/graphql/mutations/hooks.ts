"use client";

import {useMutation} from "@apollo/client/react";
import {ADD_PATIENT, UPDATE_DIAGNOSES} from "@/src/graphql/mutations/patients";
import {PATIENT_QUERY, PATIENTS_QUERY} from "@/src/graphql/queries/patients";

export const useAddPatient = () => {
    const [addPatient] = useMutation(ADD_PATIENT, { refetchQueries: [PATIENTS_QUERY] })

    return addPatient
}

export const useUpdateDiagnoses = () => {
    const [updateDiagnoses] = useMutation(UPDATE_DIAGNOSES, { refetchQueries: [PATIENT_QUERY]})

    return updateDiagnoses
}