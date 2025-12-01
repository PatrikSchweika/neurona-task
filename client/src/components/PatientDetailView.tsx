"use client";

import {usePatient} from "@/src/graphql/queries/patients";

interface PatientDetailViewProps {
    patientId: number
}

export const PatientDetailView = ({ patientId }: PatientDetailViewProps) => {
    const { data } = usePatient(patientId)

    return (
        <>
            <div>Patient detail</div>
            <pre>{JSON.stringify(data?.patient ?? {}, null, 2)}</pre>
        </>
    )
}