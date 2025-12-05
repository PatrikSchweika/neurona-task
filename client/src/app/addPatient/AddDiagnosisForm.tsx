"use client";

import {Button, DatePicker, Divider, Form, Input} from "antd";
import {Controller, useForm} from "react-hook-form";
import {DiagnosisCreateInput} from "@/src/graphql/__generated__/graphql";
import {zodResolver} from "@hookform/resolvers/zod";
import {ADD_DIAGNOSIS_SCHEMA} from "@/src/app/addPatient/schema";
import dayjs from "dayjs";

const DEFAULT_DIAGNOSIS: DiagnosisCreateInput = {
    title: '',
    description: '',
    date: new Date().toISOString(),
}

interface AddDiagnosisFormProps {
    onSubmit: (diagnosis: DiagnosisCreateInput) => void
}

export const AddDiagnosisForm = ({ onSubmit }: AddDiagnosisFormProps) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<DiagnosisCreateInput>({
        resolver: zodResolver(ADD_DIAGNOSIS_SCHEMA),
        defaultValues: DEFAULT_DIAGNOSIS
    })

    const onSubmitInner = (diagnosisDto: DiagnosisCreateInput) => {
        onSubmit(diagnosisDto)
        reset(DEFAULT_DIAGNOSIS)
    }

    return (
        <>
            <h4 className="text-lg text-gray-900">Add diagnosis</h4>

            <Divider />

            <Form onFinish={handleSubmit(onSubmitInner)}>
                <div className="flex flex-col">
                    <Form.Item
                        validateStatus={errors.title && 'error'}
                        help={errors.title?.message}
                        label="Title"
                    >
                        <Controller
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <Input
                                    placeholder="Title"
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        validateStatus={errors.description && 'error'}
                        help={errors.description?.message}
                        label="Description"
                    >
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <Input.TextArea
                                    placeholder="Description"
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        validateStatus={errors.date && 'error'}
                        help={errors.date?.message}
                        label="Date"
                    >
                        <Controller
                            control={control}
                            name="date"
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
                        validateStatus={errors.imageUrl && 'error'}
                        help={errors.imageUrl?.message}
                        label="Image"
                    >
                        <Controller
                            control={control}
                            name="imageUrl"
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

                    <Button
                        type="default"
                        htmlType="submit"
                        className="ml-auto"
                        disabled={isSubmitting}
                    >
                        Add diagnosis
                    </Button>
                </div>
            </Form>
        </>
    )
}