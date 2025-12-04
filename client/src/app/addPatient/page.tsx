"use client";

import {Button, DatePicker, Divider, Form, Input, Tooltip} from "antd";
import {DiagnosisCreateInput, PatientCreateInput} from "@/src/graphql/__generated__/graphql";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ADD_PATIENT_SCHEMA} from "@/src/graphql/schemas/patient";
import {useAddPatient} from "@/src/graphql/mutations/hooks";
import {useRouter} from "next/navigation";
import {CloseOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

const DEFAULT_PATIENT: PatientCreateInput = {
    name: '',
    age: 0,
    diagnoses: [],
}

const DEFAULT_DIAGNOSIS: DiagnosisCreateInput = {
    title: '',
    description: '',
    date: new Date().toISOString(),
}

export default function AddPatientForm() {
    const addPatient = useAddPatient()
    const router = useRouter()

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<PatientCreateInput>({
        resolver: zodResolver(ADD_PATIENT_SCHEMA),
        defaultValues: DEFAULT_PATIENT,
    })

    const { remove, fields, append } = useFieldArray({
        control,
        name: 'diagnoses'
    })

    const onSubmitInner = async (patientDto: PatientCreateInput) => {
        await addPatient({ variables: { patientDto }})
        router.push('/')
    }

    return (
        <div className="max-w-[600px] mx-auto p-6 bg-white shadow rounded-md">
            <div className="flex flex-row justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add patient</h3>

                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    href="/"
                />
            </div>

            <Divider />


            <Form onFinish={handleSubmit(onSubmitInner)}>

                <div className="flex flex-col gap-2">
                    <Form.Item
                        validateStatus={errors.name && 'error'}
                        help={errors.name?.message}
                        label="Name"
                    >
                        <Controller
                            control={control}
                            name={'name'}
                            render={({ field }) => (
                                <Input
                                    placeholder="Name"
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        validateStatus={errors.age && 'error'}
                        help={errors.age?.message}
                        label="Age"
                    >
                        <Controller
                            control={control}
                            name={'age'}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    placeholder="Age"
                                    min={0}
                                    onChange={val => field.onChange(Number(val.currentTarget.value))}
                                    disabled={field.disabled}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                />
                            )}
                        />
                    </Form.Item>

                <h4 className="text-lg font-medium text-gray-900">Diagnoses</h4>

                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-2 p-4 shadow sm:rounded-lg">

                        <Form.Item
                            validateStatus={errors.diagnoses?.[index]?.title && 'error'}
                            help={errors.diagnoses?.[index]?.title?.message}
                            label="Title"
                        >
                            <Controller
                                control={control}
                                name={`diagnoses.${index}.title`}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Title"
                                        {...field}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            validateStatus={errors.diagnoses?.[index]?.description && 'error'}
                            help={errors.diagnoses?.[index]?.description?.message}
                            label="Description"
                        >
                            <Controller
                                control={control}
                                name={`diagnoses.${index}.description`}
                                render={({ field }) => (
                                    <Input.TextArea
                                        placeholder="Description"
                                        {...field}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            validateStatus={errors.diagnoses?.[index]?.date && 'error'}
                            help={errors.diagnoses?.[index]?.date?.message}
                            label="Date"
                        >
                            <Controller
                                control={control}
                                name={`diagnoses.${index}.date`}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholder="Date"
                                        style={{ width: '100%' }}
                                        allowClear={false}
                                        format="DD.MM.YYYY"
                                        {...field}
                                        value={field.value ? dayjs(field.value) : null}
                                        onChange={date => field.onChange(date?.toISOString())}
                                        disabledDate={date => date.isAfter(dayjs())}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            validateStatus={errors.diagnoses?.[index]?.imageUrl && 'error'}
                            help={errors.diagnoses?.[index]?.imageUrl?.message}
                            label="Image"
                        >
                            <Controller
                                control={control}
                                name={`diagnoses.${index}.imageUrl`}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Image URL"
                                        {...field}
                                        value={field.value ?? ''}
                                        onChange={({ currentTarget: { value }}) => field.onChange(value === '' ? null : value)}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Tooltip
                            title="Remove diagnosis"
                            arrow
                        >
                        <Button
                            className="ml-auto"
                            color="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(index)}
                        />
                        </Tooltip>
                    </div>
                ))}

                <Tooltip
                    title="Add diagnosis"
                    arrow
                >
                    <Button
                        type="default"
                        shape="round"
                        className="mx-auto mt-2"
                        icon={<PlusOutlined />}
                        onClick={() => append(DEFAULT_DIAGNOSIS)}
                    />
                </Tooltip>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-2 ml-auto"
                        disabled={isSubmitting}
                    >
                        Create patient
                    </Button>
                </div>
            </Form>
        </div>
    )
}