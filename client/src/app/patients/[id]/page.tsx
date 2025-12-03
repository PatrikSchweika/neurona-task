import {PatientDetailView} from "@/src/app/patients/[id]/PatientDetailView";
import {query} from "@/src/graphql/setup/apollo-client";
import {PATIENT_QUERY} from "@/src/graphql/queries/patients";

interface PatientDetailPageProps {
    params: Promise<{
        id: number
    }>
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
    const { id } = await params

    const patientId = Number(id)

    if (isNaN(patientId)) {
        return <div>Invalid patient id {id}</div>
    }

    const { data } = await query({ query: PATIENT_QUERY, variables: { patientId }})

    if (!data?.patient) {
        return <div>Loading...</div>
    }

    return (
        <PatientDetailView patient={data.patient} />
    )
}