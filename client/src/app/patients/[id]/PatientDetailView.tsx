"use client";

import {usePatient} from "@/src/graphql/queries/patients";
import {useRouter} from "next/navigation";
import dayjs from "dayjs";
import {CloseOutlined, DownOutlined, UpOutlined} from "@ant-design/icons";
import {Diagnosis} from "@/src/graphql/types/diagnosis";
import {useState} from "react";
import Image from "next/image"

interface PatientDetailViewProps {
    patientId: number
}

export const PatientDetailView = ({ patientId }: PatientDetailViewProps) => {
    const { data } = usePatient(patientId)

    const router = useRouter()

    const patient = data?.patient

    if (!patient) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg relative">
            <div className="p-4 flex flex-row justify-between">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Patient Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and diagnosis history.</p>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                >
                    <CloseOutlined className="mr-2" />
                </button>
            </div>

            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Age</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.age}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Diagnoses</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {patient.diagnoses?.map((diagnosis) => (
                                    <DiagnosisItem key={diagnosis.id} diagnosis={diagnosis} />
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

const DiagnosisItem = ({ diagnosis }: { diagnosis: Diagnosis }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <li className="pl-3 pr-4 py-3 text-sm flex flex-col">
            <div
                className="flex items-center justify-between select-none cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="w-0 flex-1 flex items-center">
                    <span className="ml-2 flex-1 w-0 truncate">
                        {diagnosis.title} ({dayjs(diagnosis.date).format("DD.MM.YYYY")})
                    </span>
                </div>
                <div className="ml-4 flex-shrink-0 text-gray-400">
                    {expanded ? <UpOutlined /> : <DownOutlined />}
                </div>
            </div>
            {expanded && (
                <>
                    <p className="mt-1 text-sm text-gray-900">
                        {diagnosis.description}
                    </p>

                    { diagnosis.imageUrl && (
                        <div className="mt-3 ml-2">
                            <Image
                                src={diagnosis.imageUrl}
                                alt={diagnosis.title}
                                className="max-w-full h-auto max-h-96 rounded-md shadow-sm object-contain"
                            />
                        </div>
                    )}
                </>
            )}
        </li>
    );
};