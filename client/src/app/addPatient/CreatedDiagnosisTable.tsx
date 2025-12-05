import {PatientCreateInput} from "@/src/graphql/__generated__/graphql";
import type {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import {DeleteOutlined} from "@ant-design/icons";
import {Table} from "antd";
import {FieldArrayWithId} from "react-hook-form";

type DataType = FieldArrayWithId<PatientCreateInput, 'diagnoses', 'id'>

interface CreatedDiagnosisTableProps {
    diagnoses: DataType[]
    loading?: boolean
    onDelete: (index: number) => void
}

export const CreatedDiagnosisTable = ({ diagnoses, loading, onDelete}: CreatedDiagnosisTableProps) => {

    const diagnosisColumns: ColumnsType<DataType> = [
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
            title: 'Delete',
            key: 'delete',
            render: (_, __, index) => <DeleteOutlined onClick={() => onDelete(index)} className="cursor-pointer" />,
        }
    ];

    return (
        <Table
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