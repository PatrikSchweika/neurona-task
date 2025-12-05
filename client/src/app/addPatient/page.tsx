"use client";

import {Button, Divider, Form, Input} from "antd";
import {PatientCreateInput} from "@/src/graphql/__generated__/graphql";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAddPatient} from "@/src/graphql/mutations/hooks";
import {useRouter} from "next/navigation";
import {CloseOutlined} from "@ant-design/icons";
import {AddDiagnosisForm} from "@/src/app/addPatient/AddDiagnosisForm";
import {ADD_PATIENT_SCHEMA} from "@/src/app/addPatient/schema";
import {CreatedDiagnosisTable} from "@/src/app/addPatient/CreatedDiagnosisTable";

const DEFAULT_PATIENT: PatientCreateInput = {
    name: '',
    age: 0,
    diagnoses: [],
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
        <div className="max-w-[1000px] mx-auto p-6 bg-white shadow rounded-md">

            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Create patient</h3>

                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        href="/"
                    />
                </div>

                <Divider />

                <div className="flex flex-row gap-4">
                    <Form
                        className="flex-grow-2 h-full"
                        onFinish={handleSubmit(onSubmitInner)}
                    >
                        <div className="flex flex-col h-full">
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

                            <h4 className="text-lg text-gray-900 mb-2">Diagnoses</h4>

                            <CreatedDiagnosisTable
                                diagnoses={fields}
                                onDelete={(id) => remove(id)}
                            />

                            <Button
                                type="primary"
                                htmlType="submit"
                                className="mt-4 ml-auto"
                                disabled={isSubmitting}
                            >
                                Create patient
                            </Button>
                        </div>
                    </Form>

                    <div className="p-4 shadow rounded-sm flex-grow-1">
                        <AddDiagnosisForm onSubmit={append} />
                    </div>
                </div>
            </div>
        </div>
    )
}