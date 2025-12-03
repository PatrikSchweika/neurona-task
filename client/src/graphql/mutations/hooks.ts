"use client";

import {useMutation} from "@apollo/client/react";
import {ADD_PATIENT} from "@/src/graphql/mutations/patients";

export const useAddPatient = () => {
    const [addPatient] = useMutation(ADD_PATIENT)

    return addPatient
}