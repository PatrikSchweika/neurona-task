"use client";

import {Button, Form, Input} from "antd";
import {PatientCreateInput} from "@/src/graphql/__generated__/graphql";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ADD_PATIENT_SCHEMA} from "@/src/graphql/schemas/patient";
import {useAddPatient} from "@/src/graphql/mutations/hooks";
import {useRouter} from "next/navigation";
import {CloseOutlined} from "@ant-design/icons";

const DEFAULT_VALUES: PatientCreateInput = {
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
        defaultValues: DEFAULT_VALUES,
    })

    const onSubmitInner = async (patientDto: PatientCreateInput) => {
        await addPatient({ variables: { patientDto }})
        router.push('/')
    }

    return (
        <div className="max-w-[400px] mx-auto p-6 bg-white shadow rounded-md">
            <div className="flex flex-row justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add patient</h3>

                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => router.push('/')}
                />
            </div>


            <Form onFinish={handleSubmit(onSubmitInner)}>
                <Form.Item
                    validateStatus={errors.name && 'error'}
                    help={errors.name?.message}
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
                >
                    <Controller
                        control={control}
                        name={'age'}
                        render={({ field }) => (
                            <Input
                                type="number"
                                placeholder="Age"
                                onChange={val => field.onChange(Number(val.currentTarget.value))}
                                disabled={field.disabled}
                                onBlur={field.onBlur}
                                value={field.value}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        disabled={isSubmitting}
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}