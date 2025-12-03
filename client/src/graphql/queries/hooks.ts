"use client";

import {useQuery} from "@apollo/client/react";
import {PATIENT_QUERY, PATIENTS_QUERY} from "@/src/graphql/queries/patients";

export const usePatients = () => {
    return useQuery(PATIENTS_QUERY)
}

export const usePatient = (patientId: number) => {
    return useQuery(PATIENT_QUERY, { variables: { patientId } })
}