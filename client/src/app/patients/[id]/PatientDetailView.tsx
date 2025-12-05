"use client";

import {usePatient} from "@/src/graphql/queries/hooks";
import {useRouter} from "next/navigation";
import {CloseOutlined} from "@ant-design/icons";
import {Button, Descriptions, Skeleton} from "antd";
import {useUpdateDiagnoses} from "@/src/graphql/mutations/hooks";
import {DiagnosisTable} from "@/src/app/patients/[id]/DiagnosisTable";

interface PatientDetailViewProps {
    patientId: number
}

export const PatientDetailView = ({ patientId }: PatientDetailViewProps) => {
    const { data, loading } = usePatient(patientId)
    const updateDiagnoses = useUpdateDiagnoses()


    const router = useRouter()

    const patient = data?.patient

    const handleDeleteDiagnosis = async (diagnosisId: number) => {
        if (!patient) {
            return
        }

        const newDiagnoses = patient.diagnoses
            .filter(d => d.id !== diagnosisId)
            .map(({ __typename: _, ...diagnosis }) => ({
                ...diagnosis
            }))

        await updateDiagnoses({ variables: { patientId: patient.id, diagnoses: newDiagnoses }})
    }

    return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg relative p-6">
                <div className="flex flex-row justify-between mb-6">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Patient Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and diagnosis history.</p>
                    </div>

                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => router.push('/')}
                    />
                </div>

                <Descriptions bordered column={1} className="mb-8">
                    <Descriptions.Item label="Full name">{loading ? <Skeleton /> : patient?.name}</Descriptions.Item>
                    <Descriptions.Item label="Age">{loading ? <Skeleton /> : patient?.age}</Descriptions.Item>
                </Descriptions>

                <h4 className="mt-4 text-md font-medium text-gray-900 mb-4">Diagnoses</h4>

                <DiagnosisTable
                    diagnoses={patient?.diagnoses ?? []}
                    loading={loading}
                    onDelete={handleDeleteDiagnosis}
                />
            </div>
    )
}