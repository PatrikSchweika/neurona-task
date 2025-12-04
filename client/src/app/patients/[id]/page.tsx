import {PatientDetailView} from "@/src/app/patients/[id]/PatientDetailView";

interface PatientDetailPageProps {
    params: Promise<{
        id: number
    }>
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
    const { id } = await params

    return (
        <PatientDetailView patientId={Number(id)} />
    )
}