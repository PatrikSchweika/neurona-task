"use client";

import { useRouter } from "next/navigation";
import {Diagnosis, PatientListItem} from "@/src/graphql/__generated__/graphql";
import {Table} from "antd";
import type {ColumnsType} from "antd/es/table";

interface PatientListProps {
    data: PatientListItem[]
}

const COLUMNS: ColumnsType<PatientListItem> = [
    {
        title: '#',
        dataIndex: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Last diagnosis',
        dataIndex: 'lastDiagnosis',
        render: (lastDiagnosis: Diagnosis) => lastDiagnosis?.title ?? "N/A"
    }
];

export const PatientList = ({ data }: PatientListProps) => {
    const router = useRouter()

    const handleClick = (patientId: number) => {
        router.push(`/patients/${patientId}`)
    }

    return (
        <Table
            dataSource={data}
            columns={COLUMNS}
            rowKey="id"
            onRow={(record) => ({
                onClick: () => handleClick(record.id),
                style: { cursor: "pointer" }
            })}
        />
    )
}