"use client";

import {usePatient} from "@/src/graphql/queries/patients";
import {useRouter} from "next/navigation";
import dayjs from "dayjs";
import {CloseOutlined} from "@ant-design/icons";
import {Button, Descriptions, Table} from "antd";
import {Diagnosis} from "@/src/graphql/__generated__/graphql";
import type {ColumnsType} from "antd/es/table";
import Image from "next/image";

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

    const DIAGNOSIS_COLUMNS: ColumnsType<Diagnosis> = [
        {
            title: 'Diagnosis',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => dayjs(date).format("DD.MM.YYYY HH:mm:ss"),
            sorter: (a, b) => dayjs(a.date as string).unix() - dayjs(b.date as string).unix(),
            defaultSortOrder: 'descend'
        }
    ];

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
                    <Descriptions.Item label="Full name">{patient.name}</Descriptions.Item>
                    <Descriptions.Item label="Age">{patient.age}</Descriptions.Item>
                </Descriptions>

                <h4 className="mt-4 text-md font-medium text-gray-900 mb-4">Diagnoses</h4>

                <Table
                    className="mt-4"
                    rowKey="id"
                    columns={DIAGNOSIS_COLUMNS}
                    dataSource={patient.diagnoses ?? []}
                    bordered
                    pagination={false}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div className="ml-4">
                                <p className="text-gray-900 mb-2">{record.description}</p>
                                {record.imageUrl && (
                                    <div>
                                        <img
                                            src={record.imageUrl}
                                            alt={record.title}
                                            className="rounded-md shadow-sm object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        ),
                    }}
                />
            </div>
    )
}