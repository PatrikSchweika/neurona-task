import {PatientListItem} from "@/src/types/patient";

interface PatientListProps {
    data: PatientListItem[]
}

export const PatientList = ({ data }: PatientListProps) => {
    return (
        <div>
            <h1>Patients</h1>
            <ul>
                {data.map(patient => <li key={patient.id}>{patient.name}</li>)}
            </ul>
        </div>
    )
}