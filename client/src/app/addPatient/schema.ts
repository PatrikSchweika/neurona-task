import {z} from "zod/v4";
import {DiagnosisCreateInput, PatientCreateInput} from "@/src/graphql/__generated__/graphql";

export const ADD_DIAGNOSIS_SCHEMA = z.object({
    title: z.string().trim().nonempty({ error: 'Title is required' }),
    description: z.string().trim().nonempty({ error: 'Description is required' }),
    imageUrl: z.url().nullish(),
    date: z.iso.datetime()
}) satisfies z.ZodType<DiagnosisCreateInput>

export const ADD_PATIENT_SCHEMA = z.object({
    name: z.string().trim().nonempty({ error: 'Name is required' }),
    age: z.number().min(0, { error: 'Age must be greater than 0' }),
    diagnoses: z.array(ADD_DIAGNOSIS_SCHEMA)
}) satisfies z.ZodType<PatientCreateInput>
