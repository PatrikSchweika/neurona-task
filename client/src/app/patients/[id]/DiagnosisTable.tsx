"use client";

import {Table} from "antd";
import {Diagnosis} from "@/src/graphql/__generated__/graphql";
import type {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import {DeleteOutlined} from "@ant-design/icons";

interface DiagnosisTableProps {
    diagnoses: Diagnosis[]
    loading?: boolean
    onDelete: (diagnosisId: number) => void
}

export const DiagnosisTable = ({ diagnoses, loading, onDelete}: DiagnosisTableProps) => {

    const diagnosisColumns: ColumnsType<Diagnosis> = [
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
            sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
            defaultSortOrder: 'descend'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, diagnosis) => <DeleteOutlined onClick={() => onDelete(diagnosis.id)} className="cursor-pointer" />,
        }
    ];

    return (
        <Table
            className="mt-4"
            rowKey="id"
            columns={diagnosisColumns}
            dataSource={diagnoses}
            loading={loading}
            bordered
            pagination={false}
            expandable={{
                expandedRowRender: (record) => (
                    <div className="ml-4">
                        <p className="text-gray-900 mb-2">{record.description}</p>
                        {record.imageUrl && (
                            <div>
                                <picture>
                                    <img
                                        src={record.imageUrl}
                                        alt={record.title}
                                        className="rounded-md shadow-sm object-contain"
                                    />
                                </picture>
                            </div>
                        )}
                    </div>
                ),
            }}
        />
    )
}