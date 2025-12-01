import {PatientDetailView} from "@/src/components/PatientDetailView";

interface PatientDetailPageProps {
    params: Promise<{
        id: number
    }>
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
    const { id } = await params

    return (
        <PatientDetailView patientId={id} />
    )
}